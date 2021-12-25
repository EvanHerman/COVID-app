import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  BrowserRouter,
} from "react-router-dom";

// Get all COVID-19 data
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
    ReactDOM.render(
      <BrowserRouter>
        <App covidData={covidData} geoLocationData={geoLocationData} />
      </BrowserRouter>,
     document.getElementById( 'root' )
    );
  } );
} );
