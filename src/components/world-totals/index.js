import React from 'react';

class WorldTotals extends React.Component {
  render() {
    let confirmedTotal = this.props.covidData.reduce( ( n, { confirmed } ) => n + confirmed, 0 ).toLocaleString( "en-US" );
    let recoveredTotal = this.props.covidData.reduce( ( n, { recovered } ) => n + recovered, 0 ).toLocaleString( "en-US" );
    let criticalTotal = this.props.covidData.reduce( ( n, { critical } ) => n + critical, 0 ).toLocaleString( "en-US" );
    let deathsTotal = this.props.covidData.reduce( ( n, { deaths } ) => n + deaths, 0 ).toLocaleString( "en-US" );
    let deathPercent = parseFloat((this.props.covidData.reduce( ( n, { deaths } ) => n + deaths, 0 )/this.props.covidData.reduce( ( n, { confirmed } ) => n + confirmed, 0 ))*100).toFixed(2)+"%";
    return (
      <div id="world-totals" className="grid grid-cols-1 md:grid-cols-4 text-gray-500">
        <div className="text-center py-10 md:py-24">
          <h2 className="text-4xl font-semibold">Confirmed</h2>
          <img src="images/confirmed.svg" alt="Confirmed Icon" className="py-4" />
          <span className="text-2xl">{ confirmedTotal }</span>
        </div>
        <div className="text-center py-10 md:py-24">
          <h2 className="text-4xl font-semibold">Recovered</h2>
          <img src="images/recovered.svg" alt="Recovered Icon" className="py-4" />
          <span className="text-2xl">{ recoveredTotal }</span>
        </div>
        <div className="text-center py-10 md:py-24">
          <h2 className="text-4xl font-semibold">Critical</h2>
          <img src="images/critical.svg" alt="Critical Icon" className="py-4" />
          <span className="text-2xl">{ criticalTotal }</span>
        </div>
        <div className="text-center py-10 md:py-24">
          <h2 className="text-4xl font-semibold">Deaths</h2>
          <img src="images/deaths.svg" alt="Deaths Icon" className="py-4" />
          <span className="text-2xl">{ deathsTotal }</span><br />
          <span className="text-sm italic">({ deathPercent })</span>
        </div>
      </div>
    );
  }
}

export default WorldTotals;
