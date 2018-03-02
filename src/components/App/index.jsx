import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './styles.css';
import Courses from '../Courses';
import FilterPane from '../FilterPane';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { COURSES } from '../../data/courses';
import { Autocomplete } from 'react-materialize';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
  
class MenuBar extends Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
    }
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  }

  render() {
    console.log("this state", this.state.showSearch)
    const { dataSource, updateSearch, device } = this.props;
    return (
      <div className="menubar-wrapper">
        { device !== 'phone' && <div className="logo">
          <h1>JavaScript Resources</h1>
        </div> }
        <div className={`menubar-btns device-${device}`}>
        {device === 'desktop' ? 
          <Autocomplete
            data={dataSource.source}
            onChange={updateSearch}
          /> : 
          <div className='search-phone'>
            <div className={`autocomplete-wrapper show-${this.state.showSearch}`}>
              <Autocomplete
                data={dataSource.source}
                onChange={updateSearch}
              />
            </div>
            <div onClick={() => this.toggleSearch()}>
              <Icon small>search</Icon>
            </div>
          </div>
        }
        </div>
        <Link to='/add'>
          <div className='menubar-add'>
            {device !== 'phone' ? 'Add A Resource' : <Icon small>playlist_add</Icon> }
          </div>
        </Link>
     </div>
    );
  }
}

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
      width: 0,
      device: '',
    }
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const state = 
      name === 'levels' ? this.state.levels :
      name === 'frameworks' ? this.state.frameworks :
      name === 'types' ? this.state.types : 
      null 

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
    window.onresize = () => this.updateWindowDimensions();
  }

  changeRangeValue = (name, value) => {
    this.setState({ [name]: value })
  }

  updateSearch = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  updateWindowDimensions = () => {
    const width = window.innerWidth || 
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width > 1000) {
      this.setState({ device: 'desktop' })
    }
    if (width < 1000) {
      this.setState({ device: 'medium' })
    } 
    if (width < 600) {
      this.setState({ device: 'phone' })
    } 
  }

  render() {
    console.log('data soruce', this.state.dataSource)
    console.log("device", this.state.device)
    return (
      <div className='app'>
        <MenuBar device={ this.state.device } dataSource={ this.state.dataSource } updateSearch={this.updateSearch} />
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