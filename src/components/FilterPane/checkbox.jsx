import React, { Component } from 'react';
import { Input } from 'react-materialize';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

   this.setState({ isChecked: !this.state.isChecked });

    handleCheckboxChange(label);
  }

  render() {
    const { label, type } = this.props;

    return (
      <Input name={type} type='checkbox' value={label} label={label} onChange={this.toggleCheckboxChange} />
    );
  }
}

export default Checkbox;