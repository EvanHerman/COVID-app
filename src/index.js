import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter,
} from "react-router-dom";

import { setCacheWithExpiry, getCacheWithExpiry } from './utils/helpers.js'

let covidCache = getCacheWithExpiry( "covid-19-cache" );

// Check for API cache
if ( covidCache !== null ) {
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
      // Cache the API data for 15 minutes
      setCacheWithExpiry( "covid-19-cache", JSON.stringify( { covidData: covidData, geoLocationData: geoLocationData } ), 900000 );
      ReactDOM.render(
        <BrowserRouter>
          <App covidData={covidData} geoLocationData={geoLocationData} />
        </BrowserRouter>,
       document.getElementById( "root" )
      );
    } );
  } );
}
