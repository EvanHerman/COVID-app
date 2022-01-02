import React, { useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import "./style.css";

const Marker = ({ children }) => children;

export default function Map( props ) {
  const mapRef = useRef();
  const [ bounds, setBounds ] = useState( null );
  const [ zoom, setZoom ] = useState( 10 );

  // Filter countries with no data
  let filteredCovidData = props.covidData.filter( country => {
    return ( !! country.confirmed && !! country.critical && !! country.deaths && !! country.recovered );
  } );

  const points = props.covidData.map( ( country ) => ( {
    type: "Feature",
    properties: {
      cluster: false,
      countryCode: country.code,
      country: country.country,
      confirmed: country.confirmed,
      recovered: country.recovered,
      critical: country.critical,
      deaths: country.deaths
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat( country.longitude ),
        parseFloat( country.latitude )
      ]
    }
  } ) );

  const { clusters, supercluster } = useSupercluster( {
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  } );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        center={{ lat: props.geoLocationData.latitude, lng: props.geoLocationData.longitude }}
        defaultZoom={6}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={( { map } ) => {
          mapRef.current = map;
        }}
        onChange={( { zoom, bounds } ) => {
          setZoom( zoom );
          setBounds( [
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat
          ] );
        }}
      >
        { clusters.map( cluster => {
          const [ longitude, latitude ] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if ( isCluster ) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + ( pointCount / points.length ) * 20}px`,
                    height: `${10 + ( pointCount / points.length ) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom( cluster.id ),
                      20
                    );
                    mapRef.current.setZoom( expansionZoom );
                    mapRef.current.panTo( { lat: latitude, lng: longitude } );
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`covid-${cluster.properties.countryCode}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="covid-marker">
                <img src="/favicon.ico" alt="COVID-19" />
              </button>
            </Marker>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
