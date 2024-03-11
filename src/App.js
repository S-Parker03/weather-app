import React from 'react';
import Weather from './Components/Weather';
import LocationBar from './Components/LocationBar';
import Waves from './Components/Waves';
import "./App.css"
import"./Mobile.css"
import { useState, useEffect } from 'react';
const App = () => {
  const [background, setBackground] = useState("day");

  function changeBackground(){
    console.log("function ran")
    var today = new Date(),

    time = today.getHours()
    console.log(time);
    switch(time){
      case(time < 8 && time > 5):
        setBackground("morning");
        console.log("morning");
        break;
      case(time > 7 && time < 17):
        setBackground("day");
        console.log("day");
        break;
      case(time > 16 && time < 21):
        setBackground("evening");
        console.log("evening");
        break;
      case(time > 20 || time < 6):
        setBackground("night");
        console.log("night");
        break;
    }
    
  }

  useEffect(() => {
    changeBackground();
    console.log(background);
  }, []);
  

  return (
    <div className ={background}>
      <LocationBar/>
      <Weather />
      <Waves />
    </div>
  );
};
export default App;
