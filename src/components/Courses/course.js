import React from 'react';
import { Icon } from 'react-materialize';
import { CourseInfoRow } from './course_components';

export const Course = ({favoriteCourses, course, addFavoriteCourse}) => (
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
        <CourseInfoRow first course={course} />
        <div className='line horizontal' />
        <CourseInfoRow course={course} />
      </div>
    </div>
    <a href={course.url} target='_blank'><button className='course-link'>Go To Resource</button></a>
  </div>
);