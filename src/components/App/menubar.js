import React, { Component } from 'react';
import { Autocomplete, Icon } from 'react-materialize';

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

  // onSearchClick = e => {
  //   this.toggleExpand('showSearch', this.state.showSearch);
  //   this.searchInput._onChange(e, value);
  // }

  render() {
    const { 
      dataSource, 
      updateSearch, 
      device, 
      toggleFavorites,  
      showFavorites, 
      favoriteCourses } = this.props;

    return (
      <div className='menubar-wrapper'>
        <div className='logo'>
          <h1>JavaScript { device === 'phone' && <br /> } Resources</h1>
        </div> 
        <div className={`menubar-btns device-${device}`}>
          <div className={`search-bar expanded-${this.state.showSearch}`}>
            <Autocomplete
              data={dataSource.source || {}}
              onChange={ e => this.onSearchClick(e) }
              ref={ (input) => { this.searchInput = input } }
            />
            <Icon className='search-icon' small onClick={ () => this.onSearchClick() }>search</Icon>
          </div>
        </div>
        <div className='favorites-container'>
          <div className='menubar-add' onClick={ toggleFavorites }>
            { device === 'desktop' || device === 'big-medium' ? 
            <div className='resources-big'> 
              <Icon small>star</Icon>
              <div>
                <span>{showFavorites ? 'Hide' : 'Show'} Resources</span>
                <div id='counter'>{`${favoriteCourses.size} selected`}</div>
              </div>
            </div> : 
            <Icon small>star</Icon> }
          </div>
        </div>
     </div>
    );
  }
}
