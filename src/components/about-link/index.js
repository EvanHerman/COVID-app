import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render( <AboutLink />, document.getElementById( 'about-link' ) );
