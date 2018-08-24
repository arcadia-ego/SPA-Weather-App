import React, { Component } from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  fetchWeather,
  fetchWeatherLocation,
  closeErrorModal
} from "../actions/index";

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
  Panel,
  Row,
  Col
} from "react-bootstrap";
import "./Landing.css";

class Landing extends Component {
  state = {
    propsArrVar: [],
    unitFont: "℉",
    selectedUnits: "imperial",
    selectedCity: "",
    weatherCards: [],
    show: false,
    showError: false,
    geo: {
      lat: "",
      lng: ""
    }
  };

  componentDidMount() {
    if (navigator.geolocation) {
      const geoErr = error => {
        alert("Couldn't locate you! Please ensure you have location enabled.");
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

  handleModal = () => {
    this.setState(prev => ({ showError: !prev.showError }));
    this.props.closeErrorModal();
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleCloseSettings = () => {
    this.setState(prev => ({ show: !prev.show }));
    if (this.state.selectedUnits === "imperial") {
      this.setState({ unitFont: "℉" });
    } else this.setState({ unitFont: "℃" });
    this.props.closeErrorModal();
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    console.log("STATE", this.state);
  };

  removeItem = (arr, item) => {
    const response = window.confirm(
      `Are you sure you want to delete that city?`
    );
    if (response) {
      arr.splice(item, 1);
      this.setState({ propsArrVar: arr });
    } else return;
  };

  onSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    let { selectedCity, selectedUnits } = this.state;
    this.props.fetchWeather(selectedCity, selectedUnits);
    console.log("submitted");
  };

  //converts the displayed temperatures of cities depending on user settings.
  convert = (degree, temp) => {
    if (degree === "℃") {
      return Math.round((temp = ((temp - 32) * 5) / 9));
    } else {
      return temp;
    }
  };

  render() {
    //conditional rendering **
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
    // **

    if (this.state.propsArrVar !== this.props.weatherCards) {
      this.setState({ propsArrVar: this.props.weatherCards });
    }

    return (
      <Grid fluid>
        <Row>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <div>Weather App!</div>
              </Navbar.Brand>
            </Navbar.Header>
            <div
              style={{
                marginTop: "50px",
                marginBot: "10px",
                color: "white",
                fontSize: "18px"
              }}
            >
              It's currently{" "}
              <span style={{ fontWeight: "bold" }}>
                {console.log("PROPS LOCALWEATHER", this.props.localWeather)}
                {this.convert(this.state.unitFont, localDisplay.data.main.temp)}
                {this.state.unitFont} in {localDisplay.data.name},
                {localDisplay.data.sys.country}
              </span>
            </div>
            <Nav pullRight>
              <NavItem eventKey={1}>
                <Button bsStyle="info" onClick={this.handleShow}>
                  <Glyphicon glyph="cog" />
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
        </Row>
        <Row className="formWrapper">
          <Col xs={4} md={4} />
          <Col xs={4} md={4}>
            <form onSubmit={this.onSubmit}>
              <FormGroup controlId="formBasicText">
                <ControlLabel>
                  Please enter the name of the city, or city and country
                  abbreviation you would like the current weather for.
                </ControlLabel>
                <FormControl
                  name="selectedCity"
                  type="text"
                  required="true"
                  value={this.state.selectedCity}
                  onChange={this.handleInput}
                  placeholder="Paris, FR"
                />
                {/* <FormControl.Feedback /> */}
              </FormGroup>
            </form>
          </Col>
          <Col xs={4} md={4} />
        </Row>
        <div className="panelContainer">
          {console.log("PROPS WEATHERCARDS", this.props.weatherCards)}
          {this.state.propsArrVar.map((card, key) => {
            return (
              <Panel bsStyle="info" className="weatherPanel" key={key}>
                <Panel.Heading>
                  {card.name}, {card.sys.country}
                </Panel.Heading>
                <Panel.Body>
                  <div>
                    Temperature:{" "}
                    {this.convert(this.state.unitFont, card.main.temp)}{" "}
                    {this.state.unitFont}
                  </div>
                  <div>
                    Likely to be experiencing (a) {card.weather[0].description}.
                  </div>
                  <Button
                    bsStyle="danger"
                    style={{ marginTop: "10px" }}
                    onClick={() => this.removeItem(this.state.propsArrVar, key)}
                  >
                    <Glyphicon glyph="trash" />
                  </Button>
                </Panel.Body>
              </Panel>
            );
          })}
        </div>
        <Modal show={this.state.show} onHide={this.handleCloseSettings}>
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
                  onChange={this.onLocalSubmit}
                >
                  Celsius
                </option>
              </FormControl>
            </form>
          </Modal.Header>
        </Modal>
        <Modal show={this.props.fetchingWeather} dialogClassName="modalDiag" />
        <Modal show={this.props.showError} onHide={this.handleModal}>
          <Modal.Header closeButton>
            <div>Error</div>
          </Modal.Header>
          <Modal.Body>
            We're sorry, we couldn't find that particular city. Please ensure
            you spelled it correctly.
          </Modal.Body>
        </Modal>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  console.log("STATE IN MAPSTATE", state);
  return {
    showError: state.weather.showError,
    errorMessage: state.weather.errorMessage,
    weatherCards: state.weather.weatherInfo,
    localWeather: state.weather.localWeather,
    fetchingWeather: state.weather.fetchingWeather,
    fetchingLocalWeather: state.weather.fetchingLocalWeather
  };
};

export default compose(
  connect(
    mapStateToProps,
    { fetchWeather, fetchWeatherLocation, closeErrorModal }
  )
)(withRouter(Landing));
