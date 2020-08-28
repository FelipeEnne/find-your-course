const getCoursesAction = courses => ({
  type: 'COURSES',
  courses,
});

const getCourseAction = course => ({
  type: 'COURSE',
  course,
});

export { getCoursesAction, getCourseAction };
