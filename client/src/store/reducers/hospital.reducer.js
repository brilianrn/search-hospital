const initialState = {
  hospitals: [],
  detailHospital: {},
  searchHospitals: []
};

function hospitalReducer(state = initialState, actions) {
  const { type, payload } = actions;

  if (type === "HOSPITALS/SET_HOSPITALS") {
    return { ...state, hospitals: payload };
  } else if (type === "DETAIL_HOSPITAL/SET_DETAIL_HOSPITAL") {
    return { ...state, detailHospital: payload };
  } else if (type === "SEARCH_HOSPITALS/SET_SEARCH_HOSPITALS") {
    return { ...state, searchHospitals: payload };
  }

  return state;
}

export default hospitalReducer;