import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter,
} from "react-router-dom";

// Check for API cache
if ( localStorage.getItem( "covid-19-cache" ) !== null ) {
  let covidCache = JSON.parse( localStorage.getItem( "covid-19-cache" ) );
  if ( !! covidCache.covidData && !! covidCache.geoLocationData ) {
    ReactDOM.render(
      <BrowserRouter>
        <App covidData={covidCache.covidData} geoLocationData={covidCache.geoLocationData} />
      </BrowserRouter>,
     document.getElementById( "root" )
    );
  }
} else {
  // Retreive all COVID-19 data
  fetch( "https://www.covid19-api.com/country/all?format=json", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
  } )
  .then( ( covidData ) => covidData.json() )
  .then( covidData => {
    // Get geolocation data for user
    fetch( "https://ipapi.co/json/", {
      "method": "GET"
    } )
    .then( ( geoLocationData ) => geoLocationData.json() )
    .then( geoLocationData => {
      window.localStorage.setItem( "covid-19-cache", JSON.stringify( { covidData: covidData, geoLocationData: geoLocationData } ) );
      ReactDOM.render(
        <BrowserRouter>
          <App covidData={covidData} geoLocationData={geoLocationData} />
        </BrowserRouter>,
       document.getElementById( "root" )
      );
    } );
  } );
}
