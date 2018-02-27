import React, { Component } from 'react';
import './styles.css';
import { COURSES } from '../../data/courses';

const filterPaneOptions = {
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  frameworks: ['None', 'React', 'Angular', 'Vue'],
  type: ['Online', 'Book', 'Podcast'],
};

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
    const filterPredicates = this.props.preferences;
    const levels = filterPredicates.levels.length > 0 ? filterPredicates.levels : filterPaneOptions.levels;
    const types = filterPredicates.types.length > 0 ? filterPredicates.types : filterPaneOptions.type;
    const frameworks = filterPredicates.frameworks.length > 0 ? filterPredicates.frameworks : filterPaneOptions.frameworks;
    const minLength = filterPredicates.lengthValue.min;
    const maxLength = filterPredicates.lengthValue.max;
    const minPrice = filterPredicates.priceValue.min;
    const maxPrice = filterPredicates.priceValue.max;
    console.log('minPrice', filterPredicates.priceValue);
    const filteredCourses = COURSES.filter(course => {
      if (levels.includes(course.level) &&
          types.includes(course.type) &&
          frameworks.includes(course.framework) &&
          minPrice <= course.price &&
          maxPrice >= course.price &&
          minLength <= course.length &&
          maxLength >= course.length) return course;
    })

    console.log('COURSES', COURSES);
    console.log("filtered courses", filteredCourses);
    return (
      <div className='courses-wrapper'>
        <h1>Courses</h1>
        <div className='courses-list'>
          { filteredCourses.map((course) => (
            <Course course={course}/>
          )) }
        </div>
      </div>
    );
  }
}