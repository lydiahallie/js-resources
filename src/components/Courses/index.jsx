import React, { Component } from 'react';
import './styles.css';
import { COURSES } from '../../data/courses';

const Course = ({course}) => (
  <div className='course-wrapper'>
    <div className='thumbnail'>
      <img className='course-img' src={course.img} />
    </div>
    <div className='course-details'>
      <h4 className='course-title'>{course.name}</h4>
      <h5 className='course-description'>{course.decription}</h5>
      <div className='course-info'>
        <div className='course-info-box'>
          <p>{course.price}</p>
        </div>
        <div className='line' />
        <div className='course-info-box'>
          <p>{course.rating}/5</p>
        </div>
        <div className='line' />
        <div className='course-info-box'>
          <p>{course.category}</p>
        </div>
      </div>
    </div>
    <button className='course-link'>Go To Resource</button>
  </div>
)

export default class Courses extends Component {
  render() {
    return (
      <div className='courses-wrapper'>
        <h1>Courses</h1>
        <div className='courses-list'>
          { COURSES.map((course) => (
            <Course course={course}/>
          )) }
        </div>
      </div>
    );
  }
}