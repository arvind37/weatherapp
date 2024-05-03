import React, { Component } from 'react';

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weatherData: null,
      loading: false,
      error: null
    };
  }

  handleChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleSubmit = () => {
    const { city } = this.state;
    this.setState({ loading: true, error: null });
    fetch(`https://api.weatherapi.com/v1/current.json?key=2df1787fb400452fbd3102605240305&q=${city}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ weatherData: data, loading: false });
      })
      .catch(error => {
        this.setState({ error: 'Failed to fetch weather data', loading: false });
        alert('Failed to fetch weather data');
      });
  };

  render() {
    const { city, weatherData, loading, error } = this.state;

    return (
      <div>
        <input
          type="text"
          value={city}
          onChange={this.handleChange}
          placeholder="Enter city name"
        />
        <button onClick={this.handleSubmit}>Search</button>

        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        
        {weatherData && (
          <div className="weather-cards">
            <div className="weather-card">
              <p>Temperature: {weatherData.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <p>Humidity: {weatherData.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <p>Condition: {weatherData.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
