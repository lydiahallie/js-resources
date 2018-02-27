import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './styles.css';
import Courses from '../Courses';
import Header from '../Header';
import FilterPane from '../FilterPane';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { COURSES } from '../../data/courses';
import { Autocomplete } from 'react-materialize';

const MenuBar = ({updateSearch, dataSource }) => (
  <div className="menubar-wrapper">
    <div className="logo">
      <h1>JavaScript Resources</h1>
    </div>
    <div className='menubar-btns'>
      <Autocomplete
        data={dataSource.source}
	    />
    </div>
    <div className='menubar-add'>
      Add A Resource
    </div>
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
      searchValue: '',
      dataSource: {},
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

  componentDidMount() {
    let source = {};
    COURSES.map((course) => {
      source[`${course.name}`] = course.img;
      this.setState({ dataSource: {...this.state.dataSource, source} })
    })
  }

  changeRangeValue = (name, value) => {
    this.setState({ [name]: value })
  }

  updateSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    console.log("this state", this.state)
    return (
      <div className='app'>
        <MenuBar dataSource={ this.state.dataSource } updateSearch={this.updateSearch} />
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