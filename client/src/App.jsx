import React from 'react';
import $ from 'jquery';
// import styled from 'styled-components';
// import "@fontsource/roboto";
// import "@fontsource/roboto/700.css";
import '../dist/styles.css';

var TEST_MODE = false;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numBeds: 0,
      numBaths: 0,
      numBedrooms: 0,
      numGuests: 0,
      typeOfStay: '',
      hostName: '',
      hostPhotoURL: '',
      isSuperhost: false
    }
  }

  componentDidMount() {
    var productId = window.location.pathname.split('/')[2];
    if (productId === null || productId === undefined || productId.length === 0) {
      productId = '109';
    }
    var stateUpdateObj = {};
    $.ajax({
      mode: 'GET',
      url: `/rooms/${productId}/summary`,
      success: (info) => {
        stateUpdateObj = info;
        console.log(stateUpdateObj);
        this.setState(stateUpdateObj);
      },
      error: (err) => {
        console.log('Error getting summary data');
      }
    })
  }

  render() {
    return (
    <div id='AppContainerDiv'>
      <div id='SummaryBarContainerDiv'>
        <div id='LeftDiv'>
          <div id='SummaryTitleDiv'>{`${this.state.typeOfStay} hosted by ${this.state.hostName}`}</div>
          <div id='SummaryItemsDiv'>{`Beds: ${this.state.numBeds}  \u2022  Baths: ${this.state.numBaths}  \u2022  Bedrooms: ${this.state.numBedrooms}  \u2022  Guests: ${this.state.numGuests}`}</div>
        </div>
        {/* <div id='PhotoDiv'>
          <img id='HostImage' src={this.state.hostPhotoURL}/>
          <div id='superhost'>{this.state.isSuperhost ? '🎖' : ''}</div>
        </div> */}
      </div>
    </div>)
  }

}

export default App;