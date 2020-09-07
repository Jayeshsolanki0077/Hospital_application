import React from "react";
import { connect } from "react-redux";
import {
  patientRecord,
  updatePatientList,
} from "../../actions/index";
import { Link } from "react-router-dom";
import { Label, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullname: "",
      phone: "",
      diagnosis: "",
      medication: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      error: "",
      errors: {},
    };
  }
  componentDidMount() {
    // console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      let data = this.props.patientDetails.filter(
        (each) => each.email === this.props.match.params.id
      );
      console.log("data", data);
      this.setState(...data);
    }
  }

  onValidate = () => {
    const data = this.state;
    const errors = this.state.errors;
    let isValid = true;
    if (!new RegExp(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/).test(data.fullname)) {
      errors["fullname"] = "Please Enter a Valid Full Name";
      isValid = false;
    }
    if (!new RegExp(/^[0-9]{10}$/).test(data.phone)) {
      errors["phone"] = "Please enter valid 10 digit Mobile number.";
      isValid = false;
    }
    if (
      !new RegExp(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/).test(data.password)
    ) {
      errors["password"] = "Please enter valid Password. ie. Min 8 length, 1 uppercase, 1 lowercase.";
      isValid = false;
    }
    if (!new RegExp(/^[0-9]{6}$/).test(data.pincode)) {
      errors["pincode"] = "Please enter valid Pin code";
      isValid = false;
    }
    if (!new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(data.email)) {
      errors["email"] = "Please enter valid email address";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };
  onUpdate = () => {
    console.log("Inside on update function");
    let UpdatedList = this.props.patientDetails.map((each) => {
      if (each.email === this.state.email) {
        return this.state;
      }
      return each;
    });
    this.props.updatePatientList(UpdatedList);
    this.props.history.push("/DoctorhomePage");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.onValidate()) {
      const {
        email,
        password,
        fullname,
        phone,
        diagnosis,
        medication,
        address,
        city,
        state,
        country,
        pincode,
      } = this.state;
      const isAutorized = this.props.patientDetails.map(
        (element) => element.email === email && element.password === password
      );
      if (isAutorized.includes(true)) {
        this.setState({ error: "Email - Id already registered" });
      } else {
        // this.props.createLogin({ email: email, password: password });
        this.props.createPatientRecord({
          id: 2,
          email: email,
          password: password,
          fullname: fullname,
          phone: phone,
          diagnosis: diagnosis,
          medication: medication,
          address: address,
          city: city,
          state: state,
          country: country,
          pincode: pincode,
        });
        this.props.history.push("/DoctorhomePage");
      }
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value, error: "", errors: {} });
  };

  render() {
    const { errors } = this.state;
    const customStyles = {
      backgroundStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "url(https://motionarray.imgix.net/preview-141192-Mi0B7jCQQ8-high_0001.jpg)",
        backgroundSize: "cover",
      },
      logo: {
        filter: "invert(70%)drop-shadow(5px 10px 3px #53515142)",
        padding: "20px",
        height: "30%",
        width: "30%",
      },
    };

    return (
      <div style={customStyles.backgroundStyle}>
        <div style={{ width: "50vw" }}>
          <div className="text-center">
            <div>
              <img
                style={customStyles.logo}
                alt="ajackus"
                src="https://ajackus.com/wp-content/themes/ajackus-labs/images/logo-white.png"
              />
            </div>
          </div>
          <div
            className="container card mt-5 p-4"
            style={{ borderRadius: "10px" }}>
            <h2>Please enter patient details</h2>
            <span>Please fill the form</span>
            <div className="mb-2">
              <form>
                <div className="form-group">
                  <Label className="mt-2 mb-2" color="black" ribbon>
                    Email Address
                  </Label>
                  <input
                    type="email"
                    value={this.state.email}
                    className="form-control"
                    name="email"
                    onChange={this.handleChange}
                    placeholder="Enter email"
                    autoComplete="off"
                    required
                  />
                  {errors["email"] && (
                    <span className="shared-errorColor">{errors["email"]}</span>
                  )}
                </div>
                <div className="shared-errorColor">{this.state.error}</div>
                {!this.props.match.params.id && (
                  <div className="form-group">
                    <Label className="mb-2" color="black" ribbon>
                      Password
                    </Label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.handleChange}
                      placeholder="Password"
                      autoComplete="off"
                      required
                    />
                    {errors["password"] && (
                      <span className="shared-errorColor">
                        {errors["password"]}
                      </span>
                    )}
                  </div>
                )}
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Full Name
                  </Label>
                  <input
                    type="text"
                    value={this.state.fullname}
                    className="form-control"
                    name="fullname"
                    onChange={this.handleChange}
                    placeholder="Full Name"
                    autoComplete="off"
                    required
                  />
                  {errors["fullname"] && (
                    <span className="shared-errorColor">
                      {errors["fullname"]}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Phone
                  </Label>
                  <input
                    type="number"
                    value={this.state.phone}
                    className="form-control"
                    name="phone"
                    onChange={this.handleChange}
                    placeholder="Phone number"
                    autoComplete="off"
                    required
                  />
                  {errors["phone"] && (
                    <span className="shared-errorColor">{errors["phone"]}</span>
                  )}
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Diagnosis
                  </Label>
                  <textarea
                    rows="4"
                    value={this.state.diagnosis}
                    className="form-control"
                    name="diagnosis"
                    onChange={this.handleChange}
                    placeholder="Diagnosis"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Prescribed Medication
                  </Label>
                  <textarea
                    rows="4"
                    value={this.state.medication}
                    className="form-control"
                    name="medication"
                    onChange={this.handleChange}
                    placeholder="Prescribed Medication"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Address
                  </Label>
                  <input
                    type="text"
                    value={this.state.address}
                    className="form-control"
                    name="address"
                    onChange={this.handleChange}
                    placeholder="Address"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    City
                  </Label>
                  <input
                    type="text"
                    value={this.state.city}
                    className="form-control"
                    name="city"
                    onChange={this.handleChange}
                    placeholder="City"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    State
                  </Label>
                  <input
                    type="text"
                    value={this.state.state}
                    className="form-control"
                    name="state"
                    onChange={this.handleChange}
                    placeholder="State"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Country
                  </Label>
                  <input
                    type="text"
                    value={this.state.country}
                    className="form-control"
                    name="country"
                    onChange={this.handleChange}
                    placeholder="Country"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="form-group">
                  <Label className="mb-2" color="black" ribbon>
                    Pin Code
                  </Label>
                  <input
                    type="number"
                    value={this.state.pincode}
                    className="form-control"
                    name="pincode"
                    onChange={this.handleChange}
                    placeholder="Pin Code"
                    autoComplete="off"
                    required
                  />
                  {errors["pincode"] && (
                    <span className="shared-errorColor">
                      {errors["pincode"]}
                    </span>
                  )}
                </div>
                {this.props.match.params.id ? (
                  <Button
                    color="green"
                    onClick={this.onUpdate}
                    className="mb-2">
                    {" "}
                    Update{" "}
                  </Button>
                ) : (
                  <Button
                    onClick={this.handleSubmit}
                    color="black"
                    className="mb-2">
                    Submit
                  </Button>
                )}
                <Link to="/">
                  <button className="btn btn-danger mb-2 ml-2">Cancel</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const dispatchStateToProps = {
  createPatientRecord: patientRecord,
  updatePatientList: updatePatientList,
};

const mapStateToProps = (state) => {
  return {
    patientDetails: state.patientRecord,
  };
};

export default withRouter(
  connect(mapStateToProps, dispatchStateToProps)(SignUp)
);
