import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchWeather, fetchWeatherLocation } from "../actions/index";
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Grid,
  Glyphicon,
  Modal,
  Radio
} from "react-bootstrap";
import "./Landing.css";

class Landing extends Component {
  state = {
    selectedUnits: "imperial",
    selectedCity: "",
    weatherCards: [],
    showModal: false
  };

  componentDidMount() {
    let geo = {};
    if (navigator.geolocation) {
      const geoErr = error => {
        alert("Couldn't locate you!");
        }
      const success = position => {
        geo.lat = position.coords.latitude;
        geo.lng = position.coords.longitude;
        this.props.fetchWeatherLocation(geo.lat, geo.lng, this.state.selectedUnits);
      }
      navigator.geolocation.getCurrentPosition(success, geoErr);
    } else {
      alert("Geolocation is not supported");
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    let { selectedCity, selectedUnits } = this.state;
    this.props.fetchWeather(selectedCity, selectedUnits);
  };

  render() {
    {
      console.log("STATE", this.state);
      console.log("PROPS", this.props);
    }
    return (
      <Grid fluid>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <div>Weather App!</div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsSize="large" pullRight>
            <NavItem bsSize="large" eventKey={1} href="#">
              <Button onClick={this.handleShow}>
                <Glyphicon glyph="cog" />
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="formWrapper">
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>
                Please enter the name of the city you would like the current
                weather for.
              </ControlLabel>
              <FormControl
                name="selectedCity"
                type="text"
                value={this.state.selectedCity}
                onChange={this.handleInput}
                placeholder="Enter desired city."
              />
              {/* <FormControl.Feedback /> */}
            </FormGroup>
          </form>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            <form onSubmit={this.onSubmit}>
              <ControlLabel>
                Unit of measurement (currently {this.state.selectedUnits}
                ):
              </ControlLabel>
              <FormControl
                name="selectedUnits"
                componentClass="select"
                placeholder="select"
                onChange={this.handleInput}
              >
                <option
                  name="selectedUnits"
                  value="imperial"
                  onChange={this.handleInput}
                >
                  Fahrenheit
                </option>
                <option
                  name="selectedUnits"
                  value="metric"
                  onChange={this.handleInput}
                >
                  Celsius
                </option>
              </FormControl>
            </form>
          </Modal.Header>
        </Modal>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE IN MAPSTATE", state);
  return {
    errorMessage: state.weather.errorMessage,
    weatherCards: state.weather.weatherInfo
  };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchWeather, fetchWeatherLocation }
  )
)(withRouter(Landing));
