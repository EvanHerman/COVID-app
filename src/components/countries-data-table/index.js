import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../utils/material-table-icons';
import 'flag-icons/css/flag-icons.min.css'

class CountriesDataTable extends React.Component {
  constructor( props ) {
    super( props );
    this.formatColumnNumber = this.formatColumnNumber.bind( this );
  }

  formatColumnNumber( value ) {
    return value?.toLocaleString( "en-US" )
  }

  render() {
    let data = [];

    this.props.covidData.map( ( country ) => (
      data.push( {
        countryAbbrev: country.code?.toLowerCase(),
        country: country.country,
        confirmed: country.confirmed,
        recovered: country.recovered,
        critical: country.critical,
        deaths: country.deaths,
        changed: country.lastChange
      } )
    ) )

    const columns = [
      { title: "Country", field: "country", render: value => <div><span className={`flag-icon flag-icon-${value.countryAbbrev}`}></span> {value.country}</div> },
      { title: "Confirmed", field: "confirmed", type: "numeric", render: value => this.formatColumnNumber( value.confirmed ) },
      { title: "Recovered", field: "recovered", type: "numeric", render: value => this.formatColumnNumber( value.recovered ) },
      { title: "Critical", field: "critical", type: "numeric", render: value => this.formatColumnNumber( value.critical ) },
      { title: "Deaths", field: "deaths", type: "numeric", render: value => this.formatColumnNumber( value.deaths ) },
      { title: "Changed", field: "changed" }
    ];

    const tableOptions = {
      paging: false,
      maxBodyHeight: 600,
    };

    return (
      <MaterialTable title="COVID-19 Data" icons={tableIcons} columns={columns} data={data.reverse()} options={tableOptions} />
    );
  }

}

export default CountriesDataTable;
