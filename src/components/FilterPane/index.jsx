import React, { Component } from 'react';
import { Icon } from 'react-materialize';
import './styles.css';

export default class FilterPane extends Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
    }
  }

  toggleFilterPane = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const height = this.state.expanded ? '400px' : '20px';
    const style = {
      height,
    }

    return (
      <div className='filterpane-wrapper' style={style}>
        <form>
          <select>
            <option selected value="beginners">Beginners</option>
            <option value="intermediate">Intermediate</option>
            <option selected value="advanced">Advanced</option>
          </select>
          <input type="range" min="0" max="500" step="0.05" />
          <select>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </form>
        <i className='expand-btn' onClick={this.toggleFilterPane}>
          <Icon small>{ this.state.expanded ? 'expand_less' : 'expand_more' }</Icon>
        </i>
      </div>
    );
  }
}