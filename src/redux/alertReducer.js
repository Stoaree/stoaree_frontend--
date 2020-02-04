const initialState = {
  alert: ""
}

function setAlert(alert) {
  return { type: "SET_ALERT", alert };
}

function resetAlert() {
  return { type: "SET_ALERT", alert: "" };
}

export function alertReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case "SET_ALERT":
      newState.alert = action.alert;
      break;
    default:
      break;
  }

  return newState;
}

export { setAlert, resetAlert }