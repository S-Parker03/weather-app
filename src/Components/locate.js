function Location () {
    
    return new Promise((resolve, reject) => {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    resolve({lat, long})
                },
                error => {
                    reject(error);
                }
    )}     
            
        else {
            reject(new Error("Geolocation not supported"));
        }
    })
}


export default Location