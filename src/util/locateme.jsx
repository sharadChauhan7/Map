import React, { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { FaCrosshairs } from 'react-icons/fa';
function Locateme() {
    const [isLocating, setIsLocating] = useState(false);
    const map = useMapEvents({
        click() {
            if (!isLocating) {
                map.locate();
                // console.log(" map isLocatiing  "+isLocating);
            }
        },
        locationfound(e) {
            if (isLocating) {
                // console.log("found isLocatiing  "+isLocating);
                map.flyTo(e.latlng, 15);
                setIsLocating(!isLocating);
            }
        },
    });
    const locatemeclick = () => {

        setIsLocating(!isLocating);
        // console.log("clcik isLocatiing  "+isLocating);
    };
    return (
        <div style={{ position: 'absolute', bottom: '2vh', right: '50px', zIndex: 1000 }}>
            <button onClick={locatemeclick} style={{
                borderRadius: '50%', // Makes the button circular
                padding: '10px', // Adjust padding as needed
                backgroundColor: 'white', // Background color of the button
                borderRadius: '10px', // Adjust the border radius for rounded corners
                padding: '10px', // Add padding to the button
                backgroundColor: 'white', // Background color of the button
                border: 'none', // Remove button border
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' // Add shadow to button // Add shadow to button
            }}><FaCrosshairs size={28}/>
            </button>
        </div>
    );
}
export default Locateme;