import './App.css';
import * as React from 'react';

function App() {
  const [measures, setMeasures] = React.useState(null);

  React.useEffect(() => {
    fetch('/.netlify/functions/atalaia')
      .then(r => r.json())
      .then(r => setMeasures(r))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <pre>{ measures || `No data` }</pre>
    </div>
  );
}

export default App;
