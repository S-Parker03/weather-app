import React,{ useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Icon, marker } from "leaflet";

import "./mapStyle.css";
import "leaflet/dist/leaflet.css"



//is it possible to make user location center?
export default function Map({sendDataToWeather}){
  const markers = [
    {geocode: [53.85216,-3.04027]}, //Blackpool
    {geocode: [50.80170,-1.08720]}, //Portsmouth
    {geocode: [50.83140,-0.13823]}, //Brighton
    {geocode: [50.72096, -1.8767]}, //Bournemouth
    {geocode: [50.67517, -1.2988]}, //Isle of Wight
    {geocode: [51.13034,-4.22154]}, //Croyde
    {geocode: [50.07697,-5.69862]}  //Cornwall
  ];

  const firstPlace = [
    {geocode: [50.40317,-5.06605]} //Newquay
  ]
  const secondPlace = [
    {geocode:[51.59992,-4.13730 ]}, //Gower
  ]

  const thirdPlace = [
    {geocode: [55.93961,-2.37649]} //Berwickshire
  ]

  const markerIcon = new Icon({
    iconUrl: require("./Map/marker.png"), //location of the icon
    iconSize: [38, 38] //size of the icon
    
  });

  const firstIcon = new Icon({
    iconUrl: require("./Map/first.png"),
    iconSize: [38, 38]
  });

  const secondIcon = new Icon({
    iconUrl: require("./Map/second.png"),
    iconSize: [38, 38]
  });

  const thirdIcon = new Icon({
    iconUrl: require("./Map/third.png"),
    iconSize: [38, 38]
  });


  return(
    <section className="map-container">
    <h1 id="mapTitle">Change Location:</h1>
    <MapContainer center={[54.2023,-4.47735]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker 
          position={marker.geocode} 
          icon={markerIcon}
          eventHandlers={{
            click: () => {click(marker.geocode)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}

        {firstPlace.map((marker) => (
          <Marker
          position={marker.geocode}
          icon={firstIcon}
          eventHandlers={{
            click: () => {click(marker.geocode)},

            // mouseover: () =>  {hover(marker.geocode)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}

        {secondPlace.map((marker) => (
          <Marker
          position={marker.geocode}
          icon={secondIcon}
          eventHandlers={{
            click: () => {click(marker.geocode)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}

        {thirdPlace.map((marker) => (
          <Marker
          position={marker.geocode}
          icon={thirdIcon}
          eventHandlers={{
            click: () => {click(marker.geocode)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}
    </MapContainer>
    </section>
    
  )

  function click(geocode){
    sendDataToWeather(geocode);
    console.log("sent data");
  }
  
}


