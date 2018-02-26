import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './styles.css';
import Courses from '../Courses';
import Header from '../Header';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Particles 
          params={{
            particles: {
              line_linked: {
                shadow: {
                  enable: true,
                  color: "#3CA9D1",
                  blur: 50
                }
              }
            }
          }}/>
        <Header />
        <Courses />
      </div>
    );
  }
}