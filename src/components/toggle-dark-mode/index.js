import React from 'react';

class ToggleDarkMode extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { isDarkMode: false };
    this.handleToggleClick = this.handleToggleClick.bind( this );
  }

  handleToggleClick() {
    this.setState( state => ( {
      isDarkMode: ! state.isDarkMode
    } ) );
    if ( ! this.state.isDarkMode ) {
      document.body.classList.add( 'dark' );
    }
    if ( this.state.isDarkMode ) {
      document.body.classList.remove( 'dark' );
    }
  }

  render() {
    return (
      <button className="text-gray-900 dark:text-white text-base font-medium tracking-tight bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 font-semibold toggle-dark-mode" onClick={ this.handleToggleClick  }>
        { this.state.isDarkMode ? 'Light Mode' : 'Dark Mode' }
      </button>
    );
  }

}

export default ToggleDarkMode;
