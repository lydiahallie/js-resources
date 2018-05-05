import React from 'react';
import ids from 'short-id';
import FavoriteCourse from './fav_course';

export const FavoriteCourses = ({favoriteCourses, addFavoriteCourse, showFavorites, device}) => {
  const activeFavorites = [];
  for (let item of favoriteCourses) activeFavorites.push(item);
  const style = {
    width: device === 'phone' ? '250px' : '400px',
    transform: `translateX(${device === 'phone' ? '250px' : '400px'})`,
  }

  return (
    <div className={`favorite-courses-wrapper show-${showFavorites}`} style={style}>
      { activeFavorites.length ? activeFavorites.map(course => (
        <FavoriteCourse key={ ids.generate() } addFavoriteCourse={addFavoriteCourse} course={course} /> )) : 
        <p id="empty" key={ ids.generate() }>You haven't selected any courses yet</p>
      }
    </div>
  )
}

