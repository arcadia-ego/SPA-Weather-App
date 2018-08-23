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
  Grid,
  Glyphicon,
  Modal,
  Panel
} from "react-bootstrap";
import LoadingOverlay from 'react-loading-overlay';
import "./Landing.css";


class Landing extends Component {
  state = {
    unitFont: "℉",
    selectedUnits: "imperial",
    selectedCity: "",
    weatherCards: [],
    show: false,
    loadingModal: true,
    geo: {
      lat: "",
      lng: ""
    }
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const geoErr = error => {
        alert("Couldn't locate you!");
      };
      const success = position => {
        this.setState({
          geo: Object.assign({}, this.state.geo, {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        });
        this.props.fetchWeatherLocation(
          this.state.geo.lat,
          this.state.geo.lng,
          this.state.selectedUnits
        );
      };
      navigator.geolocation.getCurrentPosition(success, geoErr);
    } else {
      alert("Geolocation is not supported");
    }
  }
  handleClose = () => {
    this.setState({ show: false });
    if (this.state.selectedUnits === "imperial") {
      this.setState({ unitFont: "℉" });
    } else this.setState({ unitFont: "℃" });
    this.onLocalSubmit();
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onLocalSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.fetchWeatherLocation(
      this.state.geo.lat,
      this.state.geo.lng,
      this.state.selectedUnits
    );
  };

  onSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    let { selectedCity, selectedUnits } = this.state;
    this.props.fetchWeather(selectedCity, selectedUnits);
    console.log("submitted");
  };

  render() {
    {
      console.log("STATE", this.state);
      console.log("PROPS", this.props);
    }

    let localDisplay = {
      data: {
        main: {
          temp: "Loading..."
        },
        name: "Loading...",
        sys: {
          country: "Loading..."
        }
      }
    };
    if (this.props.localWeather.data) {
      localDisplay = this.props.localWeather;
    }

    return (
      <Grid fluid>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <div>Weather App!</div>
              <div style={{ marginTop: "5px" }}>
                It's currently{" "}
                <span style={{ fontWeight: "bold" }}>
                  {console.log("PROPS LOCALWEATHER", this.props.localWeather)}
                  {localDisplay.data.main.temp} {this.state.unitFont} in{" "}
                  {localDisplay.data.name}, {localDisplay.data.sys.country}
                </span>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsSize="large" pullRight>
            <NavItem bsSize="large" eventKey={1}>
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
                required="true"
                value={this.state.selectedCity}
                onChange={this.handleInput}
                placeholder="Enter desired city."
              />
              {/* <FormControl.Feedback /> */}
            </FormGroup>
          </form>
        </div>
        <div>
          {console.log("PROPS WEATHERCARDS", this.props.weatherCards)}
          {this.props.weatherCards.map((card, key) => {
            return (
              <Panel key={key}>
                <Panel.Heading>{card.name}</Panel.Heading>
                <Panel.Body>
                  <div>
                    Temperature: {card.main.temp} {this.state.unitFont}
                  </div>
                </Panel.Body>
              </Panel>
            );
          })}
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            <form onSubmit={this.onLocalSubmit}>
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
                <option> </option>
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
        <Modal show={this.state.loadingModal}>
          <i className="spinner" class="fa fa-spinner fa-spin" style={{fontSize:"40rem", color: "blue",}}></i>
        </Modal>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE IN MAPSTATE", state);
  return {
    errorMessage: state.weather.errorMessage,
    weatherCards: state.weather.weatherInfo,
    localWeather: state.weather.localWeather
  };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchWeather, fetchWeatherLocation }
  )
)(withRouter(Landing));
