import React from 'react';
import Weather from './Components/Weather';
import LocationBar from './Components/LocationBar';
import Waves from './Components/Waves';
import "./App.css"
import"./Mobile.css"
const App = () => {
  return (
    <div style = {{
        height: "1000px",
        width: "100%",
        backgroundImage:
        'url("/Assets/Background.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <LocationBar/>
      <Weather />
      <Waves />
    </div>
  );
};
export default App;
