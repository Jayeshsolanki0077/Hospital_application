export default (state = {}, action) => {
    switch (action.type) {
      case "NEW_LOGIN":
        return action.payload.event;
      case "LOG_OUT":
        return {}
      default:
        return state;
    }
  };