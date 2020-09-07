import React from "react";
import { Icon, Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updatePatientList } from "../../../actions/index";
import "./home-page.styles.css";

class HomePageDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }
  componentDidMount() {
    if (!localStorage.getItem("isLogin") || !localStorage.getItem("isDoctor")) {
      this.props.history.push("/");
    }
  }
  handleDelete = (email) => {
    let data = this.props.patientDetails.filter((each) => each.email !== email);
    this.props.updatePatientList(data);
  };
  onSignOut = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("isDoctor");
    this.props.history.push("/");
  };
  render() {
    const customStyles = {
      backgroundStyle: {
        display: "flex",
        height: "100vh",
        top: "100px",
        justifyContent: "center",
        background:
          "url(https://motionarray.imgix.net/preview-141192-Mi0B7jCQQ8-high_0001.jpg)",
        backgroundSize: "cover",
      },
    };
    return (
      <div style={customStyles.backgroundStyle}>
        <div style={{ width: "80vw" }}>
          <Button
            primary
            floated="right"
            icon
            labelPosition="left"
            className="mt-4"
            onClick={() => this.props.history.push("/register")}>
            <Icon name="user" /> Add Patient
          </Button>
          <Button
            secondary
            floated="right"
            className="mt-4"
            onClick={this.onSignOut}>
            Sign Out
          </Button>
          <input
            type="text"
            className="searchBar"
            placeholder="Search...."
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}/>
          <Table color="blue" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell rowSpan="2">Patient Name</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Diagnosis</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">
                  Prescribed Medication
                </Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Contact Number</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">City</Table.HeaderCell>
                <Table.HeaderCell rowSpan="2">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.patientDetails
                .filter(
                  (each) =>
                    (each.id === 2 && this.state.search === "") ||
                    (each.fullname &&
                      each.fullname.includes(this.state.search)) ||
                    (each.diagnosis &&
                      each.diagnosis.includes(this.state.search)) ||
                    (each.medication &&
                      each.medication.includes(this.state.search))
                )
                .map((each, i) => (
                  <Table.Row key={i}>
                    <Table.Cell>{each.fullname}</Table.Cell>
                    <Table.Cell>{each.diagnosis}</Table.Cell>
                    <Table.Cell>{each.medication}</Table.Cell>
                    <Table.Cell>{each.phone}</Table.Cell>
                    <Table.Cell>{each.city}</Table.Cell>
                    <Table.Cell>
                      <Button
                        positive
                        floated="right"
                        onClick={() => {
                          this.props.history.push(`/register/${each.email}`);
                        }}>
                        Update
                      </Button>
                      <Button
                        negative
                        floated="right"
                        onClick={() => {
                          this.handleDelete(each.email);
                        }}>
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    checkLogin: state.login,
    patientDetails: state.patientRecord,
  };
};

const dispatchStateToProps = {
  updatePatientList: updatePatientList,
};

export default withRouter(
  connect(mapStateToProps, dispatchStateToProps)(HomePageDoctor)
);
