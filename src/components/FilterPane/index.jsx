import React, { Component } from 'react';
import { Icon, Input } from 'react-materialize';
import Checkbox from './checkbox';
import InputRange from 'react-input-range';
import './styles.css';
import 'react-input-range/lib/css/index.css';

const filterPaneOptions = {
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  frameworks: ['All', 'React', 'Angular', 'Vue'],
  type: ['Online', 'Book', 'Podcast'],
};

export default class FilterPane extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      levels: null,
      frameworks: null,
      types: null,
      lengthValue: { min: 0, max: 100 },
      priceValue:  { min: 0, max: 500 },
    }
  }

  selectedLevels = new Set();
  selectedFrameworks = new Set();
  selectedTypes = new Set();

  handleInputChange = (event) => {
    const name = event.target.name;
    if (name === 'levels') {
      if (this.selectedLevels.has(event.target.value)) {
        this.selectedLevels.delete(event.target.value);
        this.setState({ levels: this.selectedLevels });
      } else {
        this.selectedLevels.add(event.target.value);
        this.setState({ levels: this.selectedLevels });
      }
    } else if (name === 'frameworks') {
      if (this.selectedFrameworks.has(event.target.value)) {
        this.selectedFrameworks.delete(event.target.value);
        this.setState({ frameworks: this.selectedFrameworks });
      } else {
        this.selectedFrameworks.add(event.target.value);
        this.setState({ frameworks: this.selectedFrameworks });
      }
    } else {
      if (this.selectedTypes.has(event.target.value)) {
        this.selectedTypes.delete(event.target.value);
        this.setState({ types: this.selectedTypes });
      } else {
        this.selectedTypes.add(event.target.value);
        this.setState({ types: this.selectedTypes });
      }
    }
  }

  createCheckboxes = (type) => {
    if (type === 'levels') {
      return filterPaneOptions.levels.map(level => (
        <Input name='levels' type='checkbox' value={level} label={level} onChange={this.handleInputChange} />
      ));
    } else if (type === 'frameworks') {
      return filterPaneOptions.frameworks.map(framework => (
        <Input name='frameworks' type='checkbox' value={framework} label={framework} onChange={this.handleInputChange} />
      ));
    } else {
      return filterPaneOptions.type.map(type => (
        <Input name='types' type='checkbox' value={type} label={type} onChange={this.handleInputChange} />
      ));
    }
  }

  toggleFilterPane = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const height = this.state.expanded ? '300px' : '20px';
    const style = {
      height,
    }

    console.log('price value', this.state.priceValue)
    console.log("length value", this.state.lengthValue)
    console.log("this state levels", this.state.levels)
    console.log("this state framewoerks", this.state.frameworks)
    console.log("this state types", this.state.types)
    return (
      <div className='filterpane-wrapper' style={style}>
        <div className='filter-column'>
          <h6>Level</h6>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckboxes('levels')}
          </form>
        </div>
        <div className='filter-column'>
          <h6>Framework</h6>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckboxes('frameworks')}
          </form>
        </div>
        <div className='filter-column'>
          <h6>Type</h6>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckboxes('type')}
          </form>
        </div>
        <div className='filter-column'>
          <h6>Length</h6>
          <InputRange
            step={1}
            maxValue={100}
            minValue={0}
            value={this.state.lengthValue}
            onChange={value => this.setState({ lengthValue: value })} />
          <h6>Price</h6>
          <InputRange
            step={1}
            maxValue={500}
            minValue={0}
            value={this.state.priceValue}
            onChange={value => this.setState({ priceValue: value })} />
        </div>
        <i className='expand-btn' onClick={this.toggleFilterPane}>
          <Icon small>{ this.state.expanded ? 'expand_less' : 'expand_more' }</Icon>
        </i>
      </div>
    );
  }
}