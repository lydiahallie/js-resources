import React,  { Component } from 'react';
import FilterBar from './FilterBar';
import './styles.css';

export default class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='header'>
        <FilterBar />
      </div>
    )
  }
}