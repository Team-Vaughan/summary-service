import React from 'react';
import $ from 'jquery';

var TEST_MODE = true;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numBeds: 0,
      numBaths: 0,
      numBedrooms: 0,
      numGuests: 0,
      typeOfStay: '',
      hostName: TEST_MODE ? 'Brad' : '',
      hostPhotoURL: TEST_MODE ? './test/brad.jpg' : ''
    }
  }

  componentDidMount() {
    var productId = window.location.pathname.split('/')[1];
    if (productId === null || productId === undefined || productId.length === 0) {
      productId = '109';
    }

    $.ajax({
      mode: 'GET',
      url: `/${productId}/summary/info`,
      success: ({ info }) => {
        this.setState(info);
      },
      error: (err) => {
        console.log('Error getting summary data');
      }
    })
  }

  render() {
    return (<div>
      <div><h3>{`${this.state.typeOfStay} hosted by ${this.state.hostName}`}</h3></div>
      <div>{`Beds: ${this.state.numBeds}`}</div>
      <div>{`Baths: ${this.state.numBaths}`}</div>
      <div>{`Bedrooms: ${this.state.numBedrooms}`}</div>
      <div>{`Guests: ${this.state.numGuests}`}</div>
      </div>)
  }

}

export default App;