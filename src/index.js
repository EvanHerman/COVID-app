import React from 'react';
import ReactDOM from 'react-dom';

// Internal Componenets
import CountriesDataTable from './components/countries-data-table';
import WorldTotals from './components/world-totals';
import './components/about-link';

// External Componenets
import Chart from "react-google-charts";

// Styles
import './App.css';

function getData( covidData ) {
  covidData.sort( function( a, b ) {
    var keyA = new Date( a.confirmed ),
        keyB = new Date( b.confirmed );
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  } );
  let topFiveCountries = covidData.slice( -5 ).reverse();
  let tableData = [
    [ 'City', 'Confirmed', 'Recovered', 'Deaths' ],
  ];
  topFiveCountries.forEach( ( country ) => {
    tableData.push(  [
      country.country,
      country.confirmed,
      country.recovered,
      country.deaths,
    ] );
  } );
  console.log( tableData );
  return tableData;
}

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

    ReactDOM.render(
      <Chart
        chartType="ColumnChart"
        height={800}
        loader={<div>Loading Chart</div>}
        data={getData( covidData )}
        options={{
          title: 'Top 5 Countries with the Most COVID-19 Cases',
          chartArea: { width: '60%' },
          hAxis: {
            title: 'Country',
            minValue: 0,
          },
          vAxis: {
            title: 'Total Cases',
          },
        }}
      />,
      document.getElementById( 'googleColumnChart' )
    )
  } )
  .catch( error => {
    console.error( error );
  } );
} )
.catch( err => {
  console.error( err );
} );
