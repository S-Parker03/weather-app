import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Location from './locate';
import Map from "./Map";
import { unstable_renderSubtreeIntoContainer } from 'react-dom';


const Weather = () => {
    const [city, setCity] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [waveData, setWaveData] = useState(null);


    //Use Effect to refresh data depending on User location or chosen city
    useEffect(() => {

        const fetchData = async () => {
            let data = ""
            let wData = ""

            if (!city) {

                let [lat, long] = await Location()
                data = axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + lat + "," + long + '?unitGroup=metric&key=SUHHDGG2TPM5TWPVGATWAV4A4&contentType=json')
                data.then(resp => {
                    setWeatherData(resp)
                })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                wData = axios.get('https://marine-api.open-meteo.com/v1/marine?latitude=' + lat + '&longitude=' + long + '&current=wave_height,wave_direction')
                wData.then(resp2 => {
                    setWaveData(resp2)
                }).catch(error => {
                    console.error('Error:', error);
                });
            }
            else {
                try{

                    data = axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+city+'?unitGroup=metric&key=SUHHDGG2TPM5TWPVGATWAV4A4&contentType=json')
                    data.then(response => {
                        setWeatherData(response)
                    })
                    .catch(error => {
                         
                    });
                }
                catch{
                    
                    console.error("Nyan :3, BIG Mistake ( ´◔ ω◔`) ");
                }

                }
        } 
        fetchData();

    }, [city]);


    const handleDataFromMap = (data) =>{
        setCity(data[1])
    }

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <>
        {/* this brakcet shows the location header*/}
        {weatherData ? 
            (<>
            <h1 id="location" className="navBar" >{ city ? (city) : ("Current location") }</h1>
            
            
            </>) 
            : 
            (
            <>
            <h1 id="location" className="navBar" >{"Search for location"}</h1>
            <img src="" alt="downArrow"></img>
            </>)}


        <div className="all" >
            
            <div className='divider'>  
            </div>
            <div className="loc">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        
                        onChange={handleInputChange}
                    />
                </form>
            </div>
            <div className="weather">
                {weatherData ? (
                    <>
                        <section className='general'>
                            <img className='icon' src='/Assets/cloudicon.png'/>
                            <h2>Todays weather description: </h2>
                            <p className='data'>{ weatherData.data.days[0].description.toString()}</p>
                            <h2>Chance of Rain: </h2>
                            <p className='data'>{ weatherData.data.days[0].precipprob.toString() +"%"}</p>
                            <h2>Visibility: </h2>
                            <p className='data'>{ weatherData.data.days[0].visibility.toString() + " km"}</p>
                            <h2>Sunrise: </h2>
                            <p className='data'>{ weatherData.data.days[0].sunrise.toString().slice(0,5)}</p>
                            <h2>Sunset: </h2>
                            <p className='data'>{ weatherData.data.days[0].sunset.toString().slice(0,5)}</p>
                        </section>
                        <img className='mobileBar1' src='/Assets/mobileDivider.png'/>
                        <section className='temperature'>
                            <img className='icon' src='/Assets/thermometer.png'/>
                            <h2>Temperature: </h2>
                            <p className='data'>{"" + weatherData.data.days[0].tempmin.toString() + "°C (min) - " + weatherData.data.days[0].tempmax.toString() + "°C (max)"}</p>
                            <h2>Feels Like: </h2>
                            <p className='data'>{ weatherData.data.days[0].feelslike.toString() + "°C"}</p>
                            <h2>UV index: </h2>
                            <p className='data'>{ weatherData.data.days[0].uvindex.toString()}</p>
                        </section>
                        <img className='vertBar' src='/Assets/verticalBar.png'/>
                        <img className='mobileBar2' src='/Assets/mobileDivider.png'/>
                        <section className='wind'>
                            <img className='icon' src='/Assets/windicon.png'/>
                            <h2>Wind Speed: </h2>
                            <p className='data'>{weatherData.data.days[0].windspeed.toString()} mph</p>
                            <h2>Wind Direction: </h2>
                            <p className='data'>{"(bearing North): " + weatherData.data.days[0].winddir.toString() + "°"}</p>
                        </section>
                        <img className='mobileBar3' src='/Assets/mobileDivider.png'/>
                        <section className='wavedata'>
                            <img className='icon' src='/Assets/waveicon.png'/>
                            <h2>Wave Heights:</h2>
                            <p className='data'>{waveData == null ? 0 : waveData.data.wave_height.toString()} m</p>
                            <h2>Wave Directions: </h2>
                            <p className='data'>{waveData == null ? 0 : waveData.data.wave_direction.toString()} °</p>
                            <h2>High Tide: </h2>
                            <p className='data'></p>
                            <h2>Low Tide: </h2>
                            <p className='data'></p>
                        </section>

                    </>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </div>
        <Map sendDataToWeather={handleDataFromMap}/>
        </>
    );
};
export default Weather;