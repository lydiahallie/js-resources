//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ids from 'short-id';
import { Icon } from 'react-materialize';
import map from 'lodash/map';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
//Internals
import { COURSES } from '../../data/courses';
import { Course } from './course';
import { CourseInfoBox, CourseRating, CourseInfoRow } from './course_components';

export class Courses extends Component  {
  render() {
    const {
      addFavoriteCourse,
      levels,
      frameworks,
      types,
      lengthValue,
      priceValue,
      searchValue,
      favoriteCourses,
      filterPaneOptions,
    } = this.props;
    const activeLevels = levels.length > 0 ? levels : filterPaneOptions.levels,
          activeTypes = types.length > 0 ? types : filterPaneOptions.types,
          activeFrameworks = frameworks.length > 0 ? frameworks : filterPaneOptions.frameworks;
    const filteredCourses = filter(COURSES, course => {
      if (searchValue === undefined) {
        return course;
      } else if (includes(course.name.toLowerCase(), searchValue.toLowerCase()) &&
                includes(activeLevels, course.level) &&
                includes(activeTypes, course.type) &&
                includes(activeFrameworks, course.framework) &&
                priceValue.min <= course.price &&
                priceValue.max >= course.price &&
                lengthValue.min <= course.length &&
                lengthValue.max >= course.length) return course;
    });

    return (
      <div className='courses-wrapper'>
        <div className='courses-list'>
          { !filteredCourses.length ? 
            <p className='empty-list'>Oh no! It doesn't seem like there are any resources that match your preferences!</p> :
            map(filteredCourses, (course) => (
              <Course 
                key={ ids.generate() }
                favoriteCourses={ favoriteCourses } 
                addFavoriteCourse={ addFavoriteCourse } 
                course={ course } /> 
            ))
          }
        </div>
      </div>
    );
  }
}

Courses.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.string).isRequired,
  frameworks: PropTypes.arrayOf(PropTypes.string).isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  lengthValue: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  priceValue: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  searchValue: PropTypes.string.isRequired,
}