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
            <h1 id="location" className="navBar" >{ city ? (city) : ("Currect location") }</h1>
            
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
                        <section className='temperature'>
                            <div className="data"><p>{"Todays weather description: " + weatherData.data.days[0].description.toString()}</p></div>
                            <div className="data"><p>{"Temp: " + weatherData.data.days[0].tempmin.toString() + "°C (min) - " + weatherData.data.days[0].tempmax.toString() + "°C (max)"}</p></div>
                        </section>
                        <section className='wind'>
                            <div className="data"><p>{"Wind Speed (mph): " + weatherData.data.days[0].windspeed.toString()}°C</p></div>
                            <div className="data"><p>{"Wind Direction (bearing North): " + weatherData.data.days[0].winddir.toString() + "°"}</p></div>
                        </section>
                        <section className='general'>
                        
                        </section>
                        <section className='waves'>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
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