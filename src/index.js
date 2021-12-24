import React from 'react';
import ReactDOM from 'react-dom';
import CountriesDataTable from './components/countries-data-table';
import WorldTotals from './components/world-totals';
import './components/about-link';

import './App.css';

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
      <span>
        <span className={`flag-icon flag-icon-${geoLocationData.country_code?.toLowerCase()}`}></span>
        {geoLocationData.country_name}
      </span>,
      document.getElementById( 'user-country-flag' )
    );

    ReactDOM.render(
      <WorldTotals covidData={covidData} />,
      document.getElementById( 'world-totals' )
    );

    ReactDOM.render(
      <CountriesDataTable />,
      document.getElementById( 'country-data-table' )
    );
  } )
  .catch( error => {
    console.error( error );
  } );
} )
.catch( err => {
  console.error( err );
} );
