import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-materialize';
import { COURSES } from '../../data/courses';

import './styles.css';

const filterPaneOptions = {
  levels: ['Beginner', 'Intermediate', 'Advanced'],
  frameworks: ['None', 'React', 'Angular', 'Vue'],
  type: ['Online', 'Book', 'Podcast'],
};

const Course = ({favoriteCourses, course, addFavoriteCourse}) => (
  <div className='course-wrapper'>
    <div className='icon-favorite' onClick={ () => addFavoriteCourse(course)}>
      <Icon small>{ favoriteCourses.has(course) ? 'star' : 'star_border' }</Icon>
    </div>
    <div className='thumbnail'>
      <img alt={course.name} className='course-img' src={course.img} />
    </div>
    <div className='course-details'>
      <h4 className='course-title'>{course.name}</h4>
      <h5 className='course-description'>{course.decription}</h5>
      <div className='course-info'>
        <div className='course-info-row'>
          <div className='course-info-box'>
            <h6>price</h6>
            <p>{course.price}</p>
          </div>
          <div className='line' />
          <div className='course-info-box'>
            <h6>rating</h6>
            <p>{course.rating}/5</p>
          </div>
          <div className='line' />
          <div className='course-info-box'>
            <h6>level</h6>
            <p>{course.level}</p>
          </div>
        </div>
        <div className='line horizontal' />
        <div className='course-info-row'>
          <div className='course-info-box'>
            <h6>type</h6>
            <p>{course.type}</p>
          </div>
          <div className='line' />
          <div className='course-info-box'>
            <h6>framework</h6>
            <p>{course.framework}</p>
          </div>
          <div className='line' />
          <div className='course-info-box'>
            <h6>length</h6>
            <p>{course.length}</p>
          </div>
        </div>
      </div>
    </div>
    <a href={course.url}><button className='course-link'>Go To Resource</button></a>
  </div>
)

export default class Courses extends Component {
  render() {
    const filterPredicates = this.props.preferences,
          levels = filterPredicates.levels.length > 0 ? filterPredicates.levels : filterPaneOptions.levels,
          types = filterPredicates.types.length > 0 ? filterPredicates.types : filterPaneOptions.type,
          frameworks = filterPredicates.frameworks.length > 0 ? filterPredicates.frameworks : filterPaneOptions.frameworks,
          maxLength = filterPredicates.lengthValue.max,
          minLength = filterPredicates.lengthValue.min,
          minPrice = filterPredicates.priceValue.min,
          maxPrice = filterPredicates.priceValue.max

    const filteredCourses = COURSES.filter(course => {
     if (course.name.toLowerCase().includes(this.props.preferences.searchValue.toLowerCase()) &&
        levels.includes(course.level) &&
        types.includes(course.type) &&
        frameworks.includes(course.framework) &&
        minPrice <= course.price &&
        maxPrice >= course.price &&
        minLength <= course.length &&
        maxLength >= course.length) return course;
    })

    return (
      <div className='courses-wrapper'>
        <div className='courses-list'>
          { !filteredCourses.length ? 
            <p className='empty-list'>Oh no! It doesn't seem like there are any resources that match your preferences!</p> :
            filteredCourses.map((course) => (
            <Course 
              favoriteCourses={ filterPredicates.favoriteCourses } 
              addFavoriteCourse={this.props.addFavoriteCourse} 
              course={course} />
          )) }
        </div>
      </div>
    );
  }
}

Courses.propTypes = {
  preferences: PropTypes.objectOf(PropTypes.shape({
    levels: PropTypes.arrayOf(PropTypes.string).isRequired,
    frameworks: PropTypes.arrayOf(PropTypes.string).isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    lengthValue: PropTypes.objectOf(PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    })).isRequired,
    priceValue: PropTypes.objectOf(PropTypes.shape({
      min: PropTypes.number.isRequired,
      max: PropTypes.number.isRequired,
    })).isRequired,
    searchValue: PropTypes.string.isRequired,
    dataSource: PropTypes.objectOf(PropTypes.shape({
      source: PropTypes.object.isRequired,
    })).isRequired,
    width: PropTypes.number.isRequired,
    device: PropTypes.string.isRequired,
  })).isRequired,
}