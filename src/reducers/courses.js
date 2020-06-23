const coursesReducer = (state = [], action) => {
  switch (action.type) {
    case 'COURSES':
      return ([...state,
        {
          id: action.instructor.id,
          name: action.instructor.name,
          owner: action.instructor.owner,
          starts: action.instructor.starts,
          value: action.instructor.value,
          description: action.instructor.description,
          image: action.instructor.image,
        }]);
    default:
      return state;
  }
};

export default coursesReducer;
