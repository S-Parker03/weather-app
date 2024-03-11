import React from 'react';
import Weather from './Components/Weather';
import LocationBar from './Components/LocationBar';
import Waves from './Components/Waves';
import "./App.css"
import"./Mobile.css"
import"./Desktop.css"
import { useState, useEffect } from 'react';
const App = () => {
  var [background, setBackground] = useState();

  function changeBackground(){
    console.log("function ran")
    var today = new Date(),

    time = today.getHours()
    console.log(time);
    if(time < 8 && time > 5){
      setBackground("morning");
      console.log("should be: morning");
      console.log(background);
        
    }else if(time > 7 && time < 17){
      setBackground("day");
      console.log("should be: day");
      console.log(background);
       
    }else if(time > 16 && time < 21){
      setBackground("evening");
      console.log("should be: evening");
      console.log(background);
    
    }else if(time > 20 || time < 6){
      setBackground("night");
      console.log("should be: night");
      console.log(background);
    }

    
  }

  useEffect(() => {
    changeBackground();
  }, []);
  

  return (
    <div className ="day">
      <LocationBar/>
      <Weather />
      <Waves />
    </div>
  );
};
export default App;
