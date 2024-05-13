import type { Context } from "@netlify/functions"

type Measure =
{
  horario: string;
  altura: number
};

let final;

export default async (req: Request, context: Context) => {
  const resp = await fetch('https://www.rgpilots.com.br/atalaia');
  const text = await resp.text();
  const regex = /\[horario\] => (\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})\n\s+\[altura\] => (-?\d+\.\d+)/g;

  let match;
  const result : Array<Measure> = [];

  while ((match = regex.exec(text)) !== null) {
    // Create an object with horario and altura fields
    const obj : Measure = {
        horario: match[1],
        altura: parseFloat(match[2])
    };
    result.push(obj);
  }

  if (!final) {
    console.log('fetch');
    final = result.reverse().filter((value, index, arr) => {
      const _value = JSON.stringify(value);
      return index === arr.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });
  } else {
    console.log('cached');
  }

  return new Response(JSON.stringify(final));
}