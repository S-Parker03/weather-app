import React from "react";

const Waves = () =>{
    return(
        // <img className="waves" src="/Assets/waves.png"/>
        <>
            <img id="wave1" className="backgroundWave" src="./Assets/backgroundWave.png"/>
            <img id="wave2" className="waves" src="./Assets/middlegroundWave.png"/>
            <img id="wave3" className="waves" src="./Assets/foregroundWave.png"/>
        </>
    )

}
export default Waves;