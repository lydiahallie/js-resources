import React, { Component } from 'react';
import { Icon, Input } from 'react-materialize';
import Checkbox from './checkbox';
import InputRange from 'react-input-range';
import './styles.css';
import 'react-input-range/lib/css/index.css';

const filterPaneOptions = {
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  frameworks: ['React', 'Angular', 'Vue'],
  type: ['Online', 'Book', 'Podcast'],
};

export default class FilterPane extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
    }
  }

  createCheckboxes = (type) => {
    if (type === 'levels') {
      return filterPaneOptions.levels.map(level => (
        <Input name='levels' type='checkbox' value={level} label={level} onChange={this.props.handleInputChange} />
      ));
    } else if (type === 'frameworks') {
      return filterPaneOptions.frameworks.map(framework => (
        <Input name='frameworks' type='checkbox' value={framework} label={framework} onChange={this.props.handleInputChange} />
      ));
    } else {
      return filterPaneOptions.type.map(type => (
        <Input name='types' type='checkbox' value={type} label={type} onChange={this.props.handleInputChange} />
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

    return (
      <div className='filterpane-wrapper' style={style}>
        { this.state.expanded && <div className='filter-columns'>
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
            <h6>Length in hours</h6>
            <InputRange
              step={1}
              maxValue={100}
              minValue={0}
              value={this.props.lengthValue}
              onChange={value => this.props.changeRangeValue('lengthValue', value)} />
            <h6>Price in USD</h6>
            <InputRange
              step={1}
              maxValue={500}
              minValue={0}
              value={this.props.priceValue}
              onChange={value => this.props.changeRangeValue('priceValue', value)} />
          </div>
        </div> }
        <i className='expand-btn' onClick={this.toggleFilterPane}>
          <Icon small>{ this.state.expanded ? 'expand_less' : 'expand_more' }</Icon>
        </i>
      </div>
    );
  }
}