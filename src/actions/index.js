
export const newLogin = (event) => {
    return {
      type: "NEW_LOGIN",
      payload: {
        event: event,
      },
    };
  };
  
  export const logOut = () => {
    return {
      type: "LOG_OUT"
    };
  };
  
  export const createLogin = (event) => {
    return {
      type: "CREATE_LOGIN",
      payload: {
        event: event
      }
    }
  }

  export const patientRecord = (event) =>{
    return {
      type : "PATIENT_RECORDS",
      payload : {
        event : event
      }
    }
}

export const updatedPasswordRecord = (event) =>{
  return {
    type : "PASSWORD_PATIENT_RECORDS",
    payload : {
      event : event
    }
  }
}

export const updatePatientList = (event) =>{
  return {
    type : "DELETE_RECORD",
    payload : {
      event : event
    }
  }
}

