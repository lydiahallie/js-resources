import React from 'react';

export default class FavoriteCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      showInfo: false,
    }
  }

  onHover = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  render() {
    const { course } = this.props;
    return (
      <div className='favorite-course' onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
        { this.state.showInfo && 
        <div className='overwrapper-fav-course'>
          <a href={course.url} target="_blank"><p id='ofc-url'>Visit Website</p></a>
          <p onClick={() => this.props.addFavoriteCourse(course)} id='ofc-rem'>Remove</p>
        </div> }
        <img src={course.img} alt={course.name} />
        <div className='fav-course-info'>
          <strong id="fav-title">{course.name}</strong>
          <p id="fav-desc">{course.decription}</p>
        </div>
      </div>
    );
  }
};