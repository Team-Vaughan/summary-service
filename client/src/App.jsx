import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";



var TEST_MODE = true;

var SummaryBarContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100px;
  font-family: Roboto;
`;

var LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;
`;

var SummaryTitleDiv = styled.div`
  align-self: flex-start;
  font-size: large;
  font-weight: 700;

`;

var SummaryItemsDiv = styled.div`
  align-self: flex-end;
  margin-top: 5%;
`;

var PhotoDiv = styled.div`
  align-self: flex-end;
  order: 2;
  position: relative;
`;

var HostImage = styled.img`
  border-radius: 50%;
  z-index: 1;

`;

var Superhost = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 2;
  font-size: 40px;
`;






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
        console.log('received info', info);
        stateUpdateObj = info;
        $.ajax({
          mode: 'GET',
          url: TEST_MODE ? `http://localhost:5007/users/${productId}/` : `/users/${productId}/`,
          success: (hostData) => {

            stateUpdateObj.hostName = hostData.name;
            stateUpdateObj.hostPhotoURL = hostData.avatarUrl;
            stateUpdateObj.isSuperhost = hostData.isSuperhost;
            console.log('superhost status: ', hostData.isSuperhost);
            this.setState(stateUpdateObj);
          },
          error: (err) => {
            console.log('Error getting host data');
            this.setState(stateUpdateObj);
          }
        })
      },
      error: (err) => {
        console.log('Error getting summary data');
      }
    })
  }

  render() {
    return (
    <SummaryBarContainerDiv>
      <LeftDiv>
        <SummaryTitleDiv>{`${this.state.typeOfStay} hosted by ${this.state.hostName}`}</SummaryTitleDiv>
        <SummaryItemsDiv>{`Beds: ${this.state.numBeds}  \u2022  Baths: ${this.state.numBaths}  \u2022  Bedrooms: ${this.state.numBedrooms}  \u2022  Guests: ${this.state.numGuests}`}</SummaryItemsDiv>
      </LeftDiv>
      <PhotoDiv>
        <HostImage src={this.state.hostPhotoURL}/>
        <Superhost>{this.state.isSuperhost ? '🥇' : ''}</Superhost>
      </PhotoDiv>
    </SummaryBarContainerDiv>)
  }

}

export default App;