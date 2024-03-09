import React from 'react';
import Weather from './Components/Weather';
import LocationBar from './Components/LocationBar';
import "./App.css"
const App = () => {
  return (
    <div style = {{
        height: "100%",
        width: "100%",
        backgroundImage:
        'url("/Assets/Background.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      <LocationBar/>
      <Weather />
    </div>
  );
};
export default App;
