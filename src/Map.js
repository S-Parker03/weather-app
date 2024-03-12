
import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon, marker } from "leaflet";

import "./style.css";

import "leaflet/dist/leaflet.css"


//is it possible to make user location center?
export default function App(){

  const markers = [
    //Newquay
    {
      geocode: [50.40317,-5.06605]
    },
    //Gower
    {
      geocode:[51.59992,-4.13730 ]
    },
    //Croyde
    {
      geocode: [51.13034,-4.22154]
    },
    //Cornwall
    {
      geocode: [50.07697,-5.69862]
    },
    //Berwickshire
    {
      geocode: [55.93961,-2.37649]
    }
  ];

  //Creates a new icon
  const markerIcon = new Icon({
    iconUrl: require("./Assets/marker.png"), //location of the icon
    iconSize: [38, 38] //size of the icon
  });

  return(
    <MapContainer center={[51.51417,-0.11485]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={markerIcon}>
          </Marker>
        ))}
    </MapContainer>
  )
}
