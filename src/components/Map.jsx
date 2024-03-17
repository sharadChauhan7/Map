import React,{useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Navbar from './Navbar'
import geoLocation from '../util/geoLocation'
import redicon from '../assets/Marker.png';
import LocateMe from '../util/locateme'
function Map() {
  // Icon Styling
  const redIcon = new L.Icon({
    iconUrl: redicon,
    iconSize: [45, 41],
    iconAnchor: [22, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // Getting Current Position
  const position = geoLocation();

  // Map Ref
  const [map, setMap] = useState(null);

  // Destination Coordinates
  let coordinates=[[27.4324,77.6737],[27.4920,77.6732]];

  // Current Location Center
  return (
    <>
    {position.lat?(
    <div>
      <Navbar map={map} currPosition={position}/>
      <MapContainer center={[position.lat,position.lng]} zoom={13}  style={{ height: "100vh", width: "100%", position: "fixed" }}
            ref={setMap}>
        <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' 	attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
        <Marker position={[position.lat,position.lng]} icon={redIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        
        {/* Destination Coordinates */}
        {coordinates.map((coordinates,index)=>{
          return(
            <Marker position={coordinates} >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        })}
        <LocateMe/>
      </MapContainer>
    </div>):<div className='loading'>Getting Current Coordinates...</div>}
    </>
  )
}

export default Map