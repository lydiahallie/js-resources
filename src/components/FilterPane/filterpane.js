//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import InputRange from 'react-input-range';
import ids from 'short-id';
import { Icon, Input } from 'react-materialize';
import 'react-input-range/lib/css/index.css';
import map from 'lodash/map';
import includes from 'lodash/includes';
//Internals
import { COURSES } from '../../data/courses';

export default class FilterPane extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
    }
  }

  createCheckboxes = type => {
    console.log(typeof type)
    const { filterPaneOptions } = this.props;
    if (filterPaneOptions[type].length) {
      return filterPaneOptions[type].map(listItem => (
        <Input 
          key={ ids.generate() } 
          name={ type } 
          type='checkbox' 
          value={ listItem }
          label={ listItem } 
          onChange={ e => this.props.handleInputChange(e) } />
      ))
    }
  };
  
  toggleFilterPane = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const height =  this.props.device !== 'phone' ?
                    this.state.expanded ? '300px' : '30px' :
                    this.state.expanded ? '1100px' : '30px';
    const wrapped = this.props.device === 'phone' ? true : false;

    return (
      <div className='filterpane-wrapper' style={{height}}>
        { this.state.expanded ? <div className={`filter-columns wrapped-${wrapped}`}>
          <div className='filter-row'>
            <div className='filter-column'>
              <h6>Level</h6>
              <form onSubmit={ this.handleFormSubmit }>
                {this.createCheckboxes('levels')}
              </form>
            </div>
            <div className='filter-column'>
              <h6>Framework</h6>
              <form onSubmit={ this.handleFormSubmit }>
                {this.createCheckboxes('frameworks')}
              </form>
            </div>
          </div>
          <div className='filter-row'>
            <div className='filter-column'>
              <h6>Type</h6>
              <form onSubmit={ this.handleFormSubmit }>
                {this.createCheckboxes('types')}
              </form>
            </div>
            <div className='filter-column'>
              <h6>Length in hours</h6>
              <InputRange
                step={1}
                maxValue={100}
                minValue={0}
                value={ this.props.lengthValue }
                onChange={ value => this.props.changeRangeValue('lengthValue', value) } />
              <h6>Price in USD</h6>
              <InputRange
                step={1}
                maxValue={500}
                minValue={0}
                value={ this.props.priceValue }
                onChange={ value => this.props.changeRangeValue('priceValue', value) } />
            </div>
          </div>
        </div> : 
        <h5>Expand the filter pane to filter through resources</h5> }
        <i className={`expand-btn expanded-${this.state.expanded} ${this.props.device}`} onClick={ this.toggleFilterPane }>
          <Icon small>{ this.state.expanded ? 'expand_less' : 'expand_more' }</Icon>
        </i>
      </div>
    );
  }
}

FilterPane.propTypes = {
  levels: PropTypes.array.isRequired,
  frameworks: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  changeRangeValue: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  lengthValue: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  priceValue: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
};