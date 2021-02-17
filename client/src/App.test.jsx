import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.jsx';

describe('<App />', () => {

  it('has a dumb test', () => {
    expect(1).toBe(1);
  })
})

// configure({ adapter: new Adapter() });

// describe('<App />', () => {

//   it('mounts a thing', () => {

//     const wrapper = mount(<App />);
//     expect(wrapper.find('#SummaryTitleDiv')).to.have.lengthOf(1);
//   })
// })



