const initialState = {
  id: "",
  data: {},
  token: "",
  lists: {},
  role: "",
  patient: "",
  message: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, role: action.role };
    case "SET_DATA":
      return {
        ...state,
        data: action.data,
        token: action.token,
        role: action.role,
        message: action.message,
      };
    case "DELETE_USER":
      console.log(state);
      return {
        ...state,
        message: action.message,
        lists: {
          ...state.list,
          [action.role]: state.lists[action.role]?.filter(
            (id) => id !== action.id
          ),
        },
      };
    case "FORGET":
      return { ...state, message: action.message };
    case "UPDATE_DATA":
      return { ...state, data: { ...state.data, ...action.data } };
    case "DELETE_PATIENT":
      return { ...state, patient: "" };
    case "UPDATE_MEDICAL":
      return { ...state, patient: action.patient };
    case "DELETE_DATA":
      return { ...state, data: action.data, token: action.token };

    case "SET_LISTS":
      return { ...state, lists: action.data };
    case "UPDATE_LIST":
      return {
        ...state,
        lists: {
          ...state.list,
          [action.role]: state.lists[action.role]?.filter(
            (id) => id !== action.id
          ),
        },
      };

    case "LOGOUT":
      return initialState;
    case "REMOVE_PATIENT":
      return { ...state, patient: {} };
    default:
      return state;
  }
}
