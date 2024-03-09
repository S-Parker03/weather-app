import { useState } from "react";
import React from "react";

const Location = () =>{
    const [location, setLocation] = useState(null);

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(succeeded, failed);
        }else{
            console.log("Geolocation not supported");
    }
    
    function succeeded(position){
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLocation({lat,long})
    }

    function failed(){
        console.error("failed to get user location");
    }
}