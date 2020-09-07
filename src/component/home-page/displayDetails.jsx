import React from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";

const TableExampleDefinition = (props) => {
  const data = props.checkLogin[0];
  return (
    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>{data.fullname}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Address</Table.Cell>
          <Table.Cell>{data.address}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>City</Table.Cell>
          <Table.Cell>{data.city}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>State</Table.Cell>
          <Table.Cell>{data.state}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Country</Table.Cell>
          <Table.Cell>{data.country}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>PinCode</Table.Cell>
          <Table.Cell>{data.pincode}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mobile Number</Table.Cell>
          <Table.Cell>{data.phone}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Email address</Table.Cell>
          <Table.Cell>{data.email}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Diagnosis</Table.Cell>
          <Table.Cell>{data.diagnosis}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Prescribed Medication</Table.Cell>
          <Table.Cell>{data.medication}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
const mapStateToProps = (state) => {
  return {
    checkLogin: state.login,
  };
};

export default connect(mapStateToProps, null)(TableExampleDefinition);
