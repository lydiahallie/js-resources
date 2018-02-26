import React, { Component } from 'react';
import './styles.css';

export default class FilterBar extends Component {
  render() {
    return (
      <div className='filterbar-wrapper'>
        <h3>Search for great JavaScript courses</h3>
        <form>
          <select>
            <label>Difficulty</label>
            <option value="value1">Beginner</option> 
            <option value="value2" selected>Intermediate</option>
            <option value="value3">Advanced</option>
          </select>
          <select>
            <label for="GET-name">Price</label>
            <option value="value1">Free</option> 
            <option value="value2" selected>0-10</option>
            <option value="value3">10-50</option>
          </select>
          <select>
            <label for="GET-name">Length</label>
            <option value="value1">Short</option> 
            <option value="value2" selected>Long</option>
            <option value="value3">Doesn't matter</option>
          </select>
        </form>
      </div>
    );
  }
}