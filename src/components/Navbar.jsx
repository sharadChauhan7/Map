import React, {useState,useCallback,useRef } from 'react'
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
function Navbar({map,currPosition}) {

    const routingRef=useRef(null);

    let coordinates=[[27.4324,77.6737],[27.4923,77.6736]];
    let markerCordinates=useRef([]);
    // Center on marker
    const centerMarker = (curr) => {
        console.log(curr);
        map.setView(curr, 13);
      };

      function changeMarkerCordinates(coordinates){
        markerCordinates.current=coordinates;
      }


    //   Routes Logic
    const setRoute = useCallback(() => {
        if (routingRef.current) {
          map.removeControl(routingRef.current);
        }  
        routingRef.current = new L.Routing.control({
          waypoints: [
            L.latLng(markerCordinates.current[0], markerCordinates.current[1]),
            L.latLng(currPosition.lat, currPosition.lng)
          ], lineOptions: {
            styles: [{ color: "#FF204E", weight: 4 }]
          },
          show: false,
          addWaypoints: false,
          routeWhileDragging: true,
          draggableWaypoints: true,
          fitSelectedRoutes: true,
          showAlternatives: false,
          createMarker: function (i, wp, nWps) {
            return null;
          }
        }).addTo(map);
      }, [map,currPosition,markerCordinates]);

  return (
    <>
    <div className='h-[95%] w-3/12 border-2 p-4 rounded-3xl absolute top-5 left-4 z-30 bg-white shadow-2xl overflow-hidden '>
        
        <h1 className='font-medium text-2xl mt-4'>Parking near you</h1>

        {/* Make a list of all the places */}
        <div className='mt-4 h-[92%] overflow-y-scroll no-scrollbar'>
            <div >
                {coordinates.map((coordinates,index)=>{
                    //Make two buttons Center and direction
                    return(
                     <div className='flex items-center space-x-2 justify-evenly mt-4 border-2 py-5'>
                            <p>{`Marker ${index+1}`}</p>
                            <button className='bg-blue-500 text-white px-3 py-1 rounded-md' onClick={()=>{centerMarker(coordinates)}}>Center</button>
                            <button className='bg-blue-500 text-white px-3 py-1 rounded-md' onClick={()=>{changeMarkerCordinates(coordinates);setRoute();}}>Direction</button>
                    </div>)
                })}
            </div>
            
        </div>    
      </div>
      </>
  )
}

export default Navbar;