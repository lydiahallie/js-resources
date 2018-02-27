import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './styles.css';
import Courses from '../Courses';
import Header from '../Header';
import FilterPane from '../FilterPane';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { COURSES } from '../../data/courses'

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
      levels: [],
      frameworks: [],
      types: [],
      lengthValue: { min: 0, max: 100 },
      priceValue:  { min: 0, max: 500 },
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const state = 
      name === 'levels' ? this.state.levels :
      name === 'frameworks' ? this.state.frameworks :
      name === 'types' ? this.state.types : null 

    if (state.includes(event.target.value)) {
      let deleteIndex = state.indexOf(event.target.value);
      state.splice(deleteIndex, 1);
      this.setState({ [name]: state });
    } else {
      this.setState({ [name]: [...state, event.target.value] });
    }
  }

  changeRangeValue = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    console.log("this state", this.state)
    return (
      <div className='app'>
        <MenuBar />
        <div className='app-content'>
          <FilterPane 
            levels={ this.state.levels } 
            frameworks={ this.state.frameworks } 
            types={ this.state.types }
            changeRangeValue={ this.changeRangeValue }
            handleInputChange={ this.handleInputChange }
            lengthValue={ this.state.lengthValue }
            priceValue={ this.state.priceValue } />
          <Courses 
            preferences={ this.state } />
        </div>
      </div>
    );
  }
}