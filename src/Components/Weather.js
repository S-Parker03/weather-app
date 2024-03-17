import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Location from './locate'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';


const Weather = () => {
    const [city, setCity] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    /*
    const fetchChoicefq = async () => {
        try {
            await setWeatherData(axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+city+'?unitGroup=metric&key=SUHHDGG2TPM5TWPVGATWAV4A4&contentType=json'))
        }
        catch (error) {
            console.error(error);
        }
    }
    */


    useEffect(() => {
        const fetchData = async () => {
            let data = ""
            
            if (!city){
            let [lat, long] = await Location()
            console.log("in here")
            data = axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + lat + "," + long + '?unitGroup=metric&key=SUHHDGG2TPM5TWPVGATWAV4A4&contentType=json')
            data.then(resp => {
                setWeatherData(resp)
                console.log(weatherData)
                console.log("setting")
            })
            .catch(error => {
                console.error('Error:', error); // Handling any errors that occur
                });
            }

            else {
                try{
                    data = axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+city+'?unitGroup=metric&key=SUHHDGG2TPM5TWPVGATWAV4A4&contentType=json')
                    data.then(response => {
                        setWeatherData(response)
                    })
                    .catch(error => {
                        console.error('Error:', error); // Handling any errors that occur
                    });
                }
                catch{
                    console.log("headache")
                }

                }
        } 
        console.log(weatherData)
        console.log("got data")
        console.log(city)

        fetchData();
    }, [city]);

    

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
                    <button type="submit">Get Weather</button>
                </form>
            </div>
            <div className="weather">
                {weatherData ? (
                    <>
                        <section className='general'>
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
                        <img className='bar1' src='..public/Assets/horizontalBars.png'/>
                        <img className='bar3' src='..public/Assets/mobileDivider.png'/>
                        <section className='temperature'>
                            <h2>Temperature: </h2>
                            <p className='data'>{"" + weatherData.data.days[0].tempmin.toString() + "°C (min) - " + weatherData.data.days[0].tempmax.toString() + "°C (max)"}</p>
                            <h2>Feels Like: </h2>
                            <p className='data'>{ weatherData.data.days[0].feelslike.toString() + "°C"}</p>
                            <h2>UV index: </h2>
                            <p className='data'>{ weatherData.data.days[0].uvindex.toString()}</p>
                        </section>
                        <img className='bar2' src='..public/Assets/verticalBar.png'/>
                        <img className='bar4' src='..public/Assets/mobileDivider.png'/>
                        <section className='wind'>
                            <h2>Wind Speed: </h2>
                            <p className='data'>{weatherData.data.days[0].windspeed.toString()} mph</p>
                            <h2>Wind Direction: </h2>
                            <p className='data'>{"(bearing North): " + weatherData.data.days[0].winddir.toString() + "°"}</p>
                        </section>
                        <img className='bar5' src='..public/Assets/mobileDivider.png'/>
                        <section className='wavedata'>
                            <h2>Wave Heights: </h2>
                            <p className='data'></p>
                            <h2>Wave Directions: </h2>
                            <p className='data'></p>
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
        </>
    );
};
export default Weather;