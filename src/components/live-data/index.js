import React, { useState } from 'react';
import Chart from "react-google-charts";

// Internal Components
import CountriesDataTable from '../countries-data-table';
import WorldTotals from '../world-totals';

class LiveData extends React.Component {
  constructor( props ) {
    super( props );
  }

  setupChartData( covidData ) {
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
    return tableData;
  }

  render() {
    return (
      <section className="bg-white py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Live Data
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="container mx-auto px-4 mb-24">

            <WorldTotals covidData={this.props.covidData} />

            <CountriesDataTable covidData={this.props.covidData} />

            <p className="italic text-gray-500 text-center text-sm py-10">
              Information provided by RapidAPI's top COVID-19 Data API:<br />
              <a href="https://rapidapi.com/Gramzivi/api/covid-19-data" target="_blank" className="text-blue-700">COVID-19 Data API</a>
            </p>

            <Chart
              chartType="ColumnChart"
              height={800}
              loader={<div>Loading Chart</div>}
              data={this.setupChartData( this.props.covidData )}
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
            />

          </div>

        </div>
      </section>
    );
  }
}

export default LiveData;
