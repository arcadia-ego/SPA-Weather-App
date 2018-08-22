import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchWeather } from "../actions/index";
import {
  Button,
  Navbar,
  NavItem,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

class Landing extends Component {
  state = {
    selectedCity: ""
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    let { selectedCity } = this.state;
    this.props.fetchWeather(selectedCity);
  };

  render() {
    {
      console.log("STATE", this.state);
    }
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Weather App</a>
            </Navbar.Brand>
          </Navbar.Header>
          <NavItem href="#">Link</NavItem>
          <NavItem eventKey={1} href="#">
            Link
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
        </Navbar>
        <div className="formWrapper">
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
                name="selectedCity"
                type="text"
                value={this.state.selectedCity}
                onChange={this.handleInput}
                placeholder="Enter desired city."
              />
              {/* <FormControl.Feedback /> */}
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth.authenticated
  };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchWeather }
  )
)(withRouter(Landing));
