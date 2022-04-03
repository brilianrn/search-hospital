const initialState = {
  isLoading: true
};

function globalReducer(state = initialState, actions) {
  const { type, payload } = actions;

  if (type === "IS_LOADING/SET_IS_LOADING") {
    return { ...state, isLoading: payload };
  }

  return state;
}

export default globalReducer;