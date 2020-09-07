export default (state = [{id: 1, email: "doctor@doctor.com", password: "healthcare"}], action) => {
    switch (action.type) {
      case "PASSWORD_PATIENT_RECORDS":
        return [...action.payload.event];
      case "PATIENT_RECORDS":
        return [...state,action.payload.event];
      case "DELETE_RECORD":
        return action.payload.event;
      default:
        return state;
    }
  };