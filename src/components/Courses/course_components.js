import React from 'react';
import { Icon } from 'react-materialize';
import map from 'lodash/map';
import ids from 'short-id';

export const CourseInfoBox = ({name, content}) => (
  <div className='course-info-box'>
    <h6>{name}</h6>
    <div className='course-info-box-content'>{content}</div>
  </div>
);

export const CourseRating = ({rating}) => {
  let arr = new Array(rating).fill(0);
  return (
    <div className='rating-wrapper'>
    {map(arr, (star) => 
      <div id='rating' key={ ids.generate() }>
        <Icon small>star</Icon>
      </div>
    )}
    </div>
  );
}

export const CourseInfoRow = ({first, course}) => {
  return (
    <div className='course-info-row'>
      <CourseInfoBox 
        name={first ? 'price' : 'framework'} 
        content={first ? `$${course.price}` : course.framework} />
      <div className='line' />
      <CourseInfoBox 
        name={first ? 'rating' : 'length'}
        content={first ? <CourseRating rating={course.rating} /> : `~${course.length} hrs` }/>
      <div className='line' />
      <CourseInfoBox 
        name={first ? 'level' : 'type'}
        content={first ? course.level : course.type} />
    </div>
  );
}