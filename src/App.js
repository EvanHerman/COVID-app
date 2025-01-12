// Internal Dependenciess
import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

// Internal Components
import MainNav from './components/main-nav';
import Hero from './components/hero';
import LiveData from './components/live-data';
import Footer from './components/footer';

// Styles
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route exact path="/COVID-app" element={<Home covidData={this.props.covidData} geoLocationData={this.props.geoLocationData} />} />
          <Route exact path="/COVID-app/map" element={<Map covidData={this.props.covidData} />} />
        </Routes>
      </>
    );
  }
}

export default App;

/**
 * Home Component
 */
class Home extends React.Component {
  render() {
    return (
      <>
        <MainNav geoLocationData={this.props.geoLocationData} />
        <Hero />
        <LiveData covidData={this.props.covidData} />
        <Footer />
      </>
    );
  }
}

/**
 * Map Component
 */
class Map extends React.Component {
  render() {
    return (
      <div>
        <h2>Map</h2>
      </div>
    );
  }
}
