import React from 'react';
import Weather from './Components/Weather';
import LocationBar from './Components/LocationBar';
const App = () => {
  return (
    <div>
      <h1>Weather Forecast App</h1>
      <LocationBar/>
      <Weather />
    </div>
  );
};
export default App;
