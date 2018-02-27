import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './styles.css';
import Courses from '../Courses';
import Header from '../Header';
import FilterPane from '../FilterPane';

const MenuBar = () => (
  <div className="menubar-wrapper">
    <div className="logo">
      <h1>JavaScript Resources</h1>
    </div>
    <div className='menubar-btns'>
      <div className='menubar-btn'>
        All
      </div>
      <div className='menubar-btn'>
        React
      </div>
      <div className='menubar-btn'>
        Angular
      </div>
    </div>
    <div className='menubar-add'>
      Add A Resource
    </div>
  </div>
)

const SearchBar = () => (
  <div className='searchbar-wrapper'>
    <input type="text" placeholder="Search.." />
  </div>
)

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      level: null,
      price: null,
      length: null,
    }
  }

  onInputChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    return (
      <div className='app'>
        <MenuBar />
        <div className='app-content'>
          <FilterPane />
          <Courses coursePreferences={ this.state } />
        </div>
      </div>
    );
  }
}