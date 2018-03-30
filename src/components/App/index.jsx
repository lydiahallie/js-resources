import React, { Component } from 'react';
import FilterPane from '../FilterPane';
import { Courses } from '../Courses';
import { COURSES } from '../../data/courses';
import { FavoriteCourses } from '../FavoriteCourses';
import { Autocomplete, Icon } from 'react-materialize';
import './styles.css';

export class MenuBar extends Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
      showFavorites: false,
    }
  }

  toggleExpand = (key, bool) => {
    this.setState({ [key]: !bool });
  }

  render() {
    const { dataSource, updateSearch, device, toggleFavorites } = this.props;
    return (
      <div className="menubar-wrapper">
        { device !== 'phone' && <div className="logo">
          <h1>JavaScript Resources</h1>
        </div> }
        <div className={`menubar-btns device-${device}`}>
        {/* <div className={`menubar-btns device-${device}`}>
          <div className={`search-bar expanded-${this.state.showSearch}`}>
            <Autocomplete
              data={dataSource.source}
              onChange={updateSearch}
            />
            <Icon className='search-icon' small onClick={ () => this.toggleExpand('showSearch', this.state.showSearch) }>search</Icon>
          </div>
        </div>
        </div> */}
        <div className='favorites-container'>
          <div className='menubar-add' onClick={ toggleFavorites }>
            { device === 'desktop' || device === 'big-medium' ? 
            <div className='resources-big'><Icon small>star</Icon> Saved Resources</div> : 
            <Icon small>playlist_add</Icon> }
          </div>
        </div>
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
      favoriteCourses: new Set(),
      showFavorites: false,
    }
  }

  handleInputChange = (event) => {
    console.log("Handle input change!")
    const name = event.target.name;
    const state = 
      name === 'levels' ? this.state.levels :
      name === 'frameworks' ? this.state.frameworks :
      name === 'types' ? this.state.types :
      null 

    if (state.includes(event.target.value)) {
      console.log("state before", state)
      let deleteIndex = state.indexOf(event.target.value);
      state.splice(deleteIndex, 1);
      console.log("state after", state)
      this.setState({ [name]: state });
    } else {
      console.log("IS new")
      this.setState({ [name]: [...state, event.target.value] });
    }
  }

  componentDidMount() {
    let source = {};
    COURSES.map((course) => {
      source[`${course.name}`] = course.img;
      this.setState({ dataSource: {...this.state.dataSource, source} })
    })
    this.updateWindowDimensions()
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
      this.setState({ device: 'desktop' });
    } else if (width < 1000) {
      this.setState({ device: 'big-medium '});
    } else if (width < 800) {
      this.setState({ device: 'medium' });
    } else if (width < 600) {
      this.setState({ device: 'phone' });
    }
  }

  addFavoriteCourse = (course) => {
    const { favoriteCourses } = this.state;
    if (favoriteCourses.has(course)) {
      favoriteCourses.delete(course)
      this.setState({ favoriteCourses })
    } else {
      favoriteCourses.add(course)
      this.setState({ favoriteCourses });
    }
  }

  toggleFavorites = () => {
    this.setState({ showFavorites: !this.state.showFavorites })
  }

  render() {
    console.log("frameworks", this.state.frameworks)
    console.log("level", this.state.levels)
    console.log("Favorite courses", this.state.favoriteCourses)
    console.log("show favorites", this.state.showFavorites)
    return (
      <div className='app'>
        <MenuBar 
          device={ this.state.device } 
          dataSource={ this.state.dataSource } 
          updateSearch={this.updateSearch}
          favoriteCourses={ this.state.favoriteCourses }
          toggleFavorites={ this.toggleFavorites } />
        <div className='app-content'>
          <FavoriteCourses favoriteCourses={ this.state.favoriteCourses }/> 
          <FilterPane 
            levels={ this.state.levels }
            frameworks={ this.state.frameworks } 
            types={ this.state.types }
            lengthValue={ this.state.lengthValue }
            changeRangeValue={ this.changeRangeValue }
            handleInputChange={ this.handleInputChange }
            priceValue={ this.state.priceValue } />
          <Courses 
            addFavoriteCourse={this.addFavoriteCourse}
            levels={ this.state.levels }
            frameworks={ this.state.frameworks }
            types={ this.state.types }
            lengthValue={ this.state.lengthValue }
            priceValue={ this.state.priceValue }
            searchValue={ this.state.searchValue }
            dataSources={ this.state.dataSources }
            favoriteCourses={ this.state.favoriteCourses } /> 
        </div>
      </div>
    );
  }
}

