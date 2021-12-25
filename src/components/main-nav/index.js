import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

import 'flag-icons/css/flag-icons.min.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AboutLink = () => {
  const [open, setOpen] = useState( false );
  const onOpenModal = ( e ) => {
    e.preventDefault();
    setOpen( true );
  };
  const onCloseModal = () => setOpen( false );

  return (
    <div>
      <button onClick={onOpenModal}>About</button>
      <Modal open={open} onClose={onCloseModal} center aria-labelledby="About" aria-describedby="About the COVID-19 stat tracker.">
        <h2 className="font-bold text-gray-800 text-4xl text-center py-4">About COVID-19 Data Tracker</h2>
        <p className="text-gray-800 py-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
          hendrerit risus, sed porttitor quam.
        </p>
      </Modal>
    </div>
  );
};

class MainNav extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <nav id="header" className="fixed w-full z-30 top-0 text-white">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
          <div className="pl-4 flex items-center">
            <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
              <img className="h-8 inline" src="images/logo192.png" /> COVID-19 Data Tracker
            </a>
          </div>
          <div className="block lg:hidden pr-4">
            <button id="nav-toggle" className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <span>
                <span className={`flag-icon flag-icon-${this.props.geoLocationData.country_code?.toLowerCase()}`}></span>
                {this.props.geoLocationData.country_name}
              </span>
              <li className="mr-3">
                <Link className="inline-block py-2 md:px-6 text-black no-underline" to="/COVID-App/map">Map</Link>
              </li>
              <li className="mr-3">
                <AboutLink />
              </li>
            </ul>
            <button
              id="navAction"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              style={{ display: 'none' }}
            >
              Action
            </button>
          </div>

        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </nav>
    );
  }
}

export default MainNav;
