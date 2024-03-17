import { useState,useEffect } from "react"
function geoLocation() {
    let [geoLocation, setGeoLocation] = useState({});
    
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGeoLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

  return geoLocation
}

export default geoLocation