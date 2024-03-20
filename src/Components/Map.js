import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Icon, marker} from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "./mapStyle.css";
import "leaflet/dist/leaflet.css"

/* This function */
export default function Map({sendDataToWeather}){

  //List containing the geocode of the locations available for the user to choose
  const markers = [
    {geocode: [53.85216,-3.04027], city: 'Blackpool'},
    {geocode: [50.80170,-1.08720], city: 'Portsmouth'},
    {geocode: [50.83140,-0.13823], city: 'Brighton'},
    {geocode: [50.72096, -1.8767], city: 'Bournemouth'},
    {geocode: [50.67517, -1.2988], city: 'Isle of Wight'},
    {geocode: [51.13034,-4.22154], city: 'Croyde'},
    {geocode: [50.07697,-5.69862], city:  'Cornwall'},
  ];

  //Geocode of the best location for surfing (ranked 1st)
  const firstPlace = [
    {geocode: [50.40317,-5.06605], city: "Newquay"}
  ]

  //Geocode of the second best location for surfing (ranked 2nd)
  const secondPlace = [
    {geocode:[51.59992,-4.13730 ], city:'Gower'}
  ]

  //Geocode of the third best location for surfing (ranked 3rd)
  const thirdPlace = [
    {geocode: [55.93961,-2.37649], city: 'Berwickshire'}
  ]

  //Icon for normal locations (not ranked)
  const markerIcon = new Icon({
    iconUrl: require("./Map/marker.png"), //Image location
    iconSize: [38, 38] //Size of Icon
    
  });

  //Icon for best surfing location (ranked 1st)
  const firstIcon = new Icon({
    iconUrl: require("./Map/first.png"), //Image location
    iconSize: [38, 38] //Size of Icon
  });

  //Icon for second best surfing location (ranked 2nd)
  const secondIcon = new Icon({
    iconUrl: require("./Map/second.png"), //Image location
    iconSize: [38, 38] //Size of Icon
  });

  //Icon for  third best surfing location (ranked 3rd)
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
        {/* MarkerClusterGroup will cluster normal markers together to make the map less clustered */}
        <MarkerClusterGroup> 

          {/*This will add all the normal markers to the map */}
          {markers.map((marker) => (
            <Marker 
            position={marker.geocode} //Position of marker is geocode specified in markers
            icon={markerIcon} //Image of normal Icon
            eventHandlers={{
              click: () => {click(marker.geocode, marker.city)} //When marker is clicked, click() function is called
            }}>
              {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
            </Marker>
          ))}
        </MarkerClusterGroup>
        
        {/*This will add the best surfing location marker to the map */}
        {firstPlace.map((marker) => (
          <Marker
          position={marker.geocode} //Position of marker is geocode specified in firstPlace
          icon={firstIcon}
          eventHandlers={{
            click: () => {click(marker.geocode,  marker.city)},

            // mouseover: () =>  {
            //   firstIcon.iconSize = [1,1];
            //   console.log("hovered")
            // }
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}

        {/*This will add the second best surfing location marker to the map */}
        {secondPlace.map((marker) => (
          <Marker
          position={marker.geocode} //Position of marker is geocode specified in secondPlace
          icon={secondIcon}
          eventHandlers={{
            click: () => {click(marker.geocode, marker.city)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}

        {/*This will add the third best surfing location marker to the map */}
        {thirdPlace.map((marker) => (
          <Marker
          position={marker.geocode} //Position of marker is geocode specified in thirdPlace
          icon={thirdIcon}
          eventHandlers={{
            click: () => {click(marker.geocode, marker.city)}
          }}>
            {/* <Popup className={"wrapper"}> {marker.Popup} </Popup> */}
          </Marker>
        ))}
    </MapContainer>
    </section>
    
  )

  //Function triggered when a marker is clicked
  function click(geocode, city){
    let data = [geocode, city]
    sendDataToWeather(data); //Sending geocode data to weather component
    console.log(data); //Logging data sending
  }
}


