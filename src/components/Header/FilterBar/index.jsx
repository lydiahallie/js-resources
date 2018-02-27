import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.css';

export default class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      level: '',
      price: null,
      length: null,
    }
  }

  handleChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  }

  render() {
    return (
      <div className='filterbar-wrapper'>
        <h3>Specify your preferences</h3>
        <div className='filterbar-form'>
          <Select
            name="form-field-name"
            value={ this.state.level }
            onChange={(event) => this.handleChange('level', event)}
            options={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
            ]}
          />
          <Select
            name="form-field-name"
            value={ this.state.price }
            onChange={(event) => this.handleChange('price', event)}
            options={[
              { value: 'cheap', label: '0' },
              { value: 'medium', label: '10-50' },
              { value: 'expensive', label: '50+' },
            ]}
          />
          <Select
            name="form-field-name"
            value={ this.state.length }
            onChange={(event) => this.handleChange('length', event)}
            options={[
              { value: 'short', label: 'Short' },
              { value: 'medium', label: 'Medium' },
              { value: 'long', label: 'Long' },
            ]}
          />
        </div>
      </div>
    );
  }
}