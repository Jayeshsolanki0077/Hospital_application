import React from "react";
import { Label, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { updatedPasswordRecord, logOut } from "../../actions/index";

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      NewPassword: "",
      ComfirmNewPassword: "",
      error: "",
      errors: {}
    };
  }
  componentDidMount() {
    console.log("this.props.newLogin: ", this.props.newLogin);
    if (this.props.newLogin) {
      this.setState({
        currentPasswordDB: this.props.newLogin[0].password,
        emailDB: this.props.newLogin[0].email,
      });
    }
  }

  onValidate = () => {
    const data = this.state;
    const errors = this.state.errors;
    let isValid = true;
    if (
      !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/).test(data.NewPassword)
    ) {
      errors["NewPassword"] = "Please enter valid Password. ie. Min 8 length, 1 uppercase, 1 lowercase.";
      isValid = false;
    }
    if (
      !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/).test(data.ComfirmNewPassword)
    ) {
      errors["ComfirmNewPassword"] = "Please enter valid Password. ie. Min 8 length, 1 uppercase, 1 lowercase.";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.onValidate()) {
    const {
      email,
      NewPassword,
      currentPasswordDB,
      emailDB,
      ComfirmNewPassword,
      password,
    } = this.state;
    if (email === emailDB && password === currentPasswordDB) {
      if (NewPassword === ComfirmNewPassword) {
        let UpdateList = this.props.patientDetails.filter(
          (each) => each.email !== email
        );
        let newUpdate = { ...this.props.newLogin[0], password: NewPassword };
        UpdateList.push(newUpdate);
        this.props.updatedPasswordRecord(UpdateList);
        this.props.logOut();
        localStorage.removeItem("isLogin");
        if (localStorage.getItem("isDoctor")) {
          localStorage.removeItem("isDoctor");
        }
        this.props.history.push("/");
      } else {
        this.setState({ error: "Password do not match." });
      }
    } else {
      this.setState({ error: "Please check your Email-Id OR password" });
    }
    // const isAutorized = this.props.patientRecord.map(element => (element.email === email && element.password === password))
    // if (isAutorized.includes(true)) {
    //   this.props.createLogin({ email, password })
    //   this.props.history.push('/homePage');
    // }
    // else {
    //   this.setState({ error: 'Please check your Email-Id OR password' })
    // }
  }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value, error: "" });
  };
  render() {
    const { errors } = this.state;
    const customStyles = {
      backgroundStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "url(https://motionarray.imgix.net/preview-141192-Mi0B7jCQQ8-high_0001.jpg)",
        backgroundSize: "cover",
      },
      logo: {
        filter: "invert(70%)drop-shadow(5px 10px 3px #53515142)",
      },
    };
    return (
      <div>
        <div style={customStyles.backgroundStyle}>
          <div style={{ width: "50vw" }}>
            <div className="text-center">
              <div>
                <img
                  style={customStyles.logo}
                  alt="ajackus"
                  src="https://ajackus.com/wp-content/themes/ajackus-labs/images/logo-white.png"/>
              </div>
            </div>
            <div
              className="sign-in container card mt-5 p-4"
              style={{ borderRadius: "10px" }}>
              <div className="text-center h2 mb-4">
                Patient Update Password Portal
              </div>
              <div className="my-2">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <Label className="mb-2" color="violet" ribbon>
                      Email Address
                    </Label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.handleChange}
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      autoComplete="off"/>
                  </div>
                  <div className="shared-errorColor">{this.state.error}</div>
                  <div className="form-group">
                    <Label className="mb-2" color="violet" ribbon>
                      Current-Password{" "}
                    </Label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.handleChange}
                      id="exampleInputPassword1"
                      placeholder="Password"/>
                  </div>
                  <div className="form-group">
                    <Label className="mb-2" color="violet" ribbon>
                      New-Password
                    </Label>
                    <input
                      type="password"
                      className="form-control"
                      name="NewPassword"
                      onChange={this.handleChange}
                      id="exampleInputPassword1"
                      placeholder="Password"/>
                      {errors["NewPassword"] && (
                    <span className="shared-errorColor">{errors["NewPassword"]}</span>
                  )}
                  </div>
                  <div className="form-group">
                    <Label className="mb-2" color="violet" ribbon>
                      Confirm New-Password
                    </Label>
                    <input
                      type="password"
                      className="form-control"
                      name="ComfirmNewPassword"
                      onChange={this.handleChange}
                      id="exampleInputPassword1"
                      placeholder="Password"/>
                      {errors["ConfirmNewPassword"] && (
                    <span className="shared-errorColor">{errors["ComfirmNewPassword"]}</span>
                  )}
                  </div>
                  <Button type="submit" color={"violet"} className="mb-2">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newLogin: state.login,
    patientDetails: state.patientRecord,
  };
};

const dispatchStateToProps = {
  updatedPasswordRecord: updatedPasswordRecord,
  logOut: logOut,
};

export default connect(mapStateToProps, dispatchStateToProps)(UpdatePassword);
