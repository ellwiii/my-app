import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'

import ReloadIcon from './components/ReloadIcon'
import LoadingScreen from './components/LoadingScreen';
import HandleLocation from './components/HandleLocationInfo';
import HandleRate from './components/HandleRateInfo';
import HandleLink from './components/HandleLink';
import WeatherInfo from './components/HandleWeatherInfo';

import { colors, credentials } from './utils/index';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currencyRate, setCurrencyRate] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setErrorMessage(null);
    setCurrentLocation(null);
    setCurrentWeather(null);
    setCurrencyRate(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      //lat: 35.912840 lng: 14.501440 - Sliema, Malta just to show how it would work from outside of PL
      const lat = latitude;//35.912840;
      const lng = longitude;//14.501440;
      setCurrentLocationFromRequest(lat, lng);
      setCurrentWeatherFromRequest(lat, lng);
    } catch (error) {
      setErrorMessage(error.errorMessage);
    }
  }

  async function setCurrentLocationFromRequest(latitude, longitude) {
    const url = `${credentials.LOCATION_API_URL}?q=${latitude}+${longitude}&key=${credentials.LOCATION_API_KEY}&language=en`;

    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      const currency_iso_code = result.results[0].annotations.currency.iso_code;

      setCurrencyRateFromRequest(currency_iso_code);
      setCurrentLocation(result);
    } else {
      setErrorMessage(`Request ended with status ${response.errorMessage})`);
    }
  }

  async function setCurrentWeatherFromRequest(latitude, longitude) {
    const url = `${credentials.WEATHER_API_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${credentials.WEATHER_API_KEY}`

    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      setCurrentWeather(result);
    } else {
      setErrorMessage(`Request ended with status ${response.errorMessage})`);
    }
  }

  async function setCurrencyRateFromRequest(currencyCode) {
    var code = 'eur';
    if (currencyCode.toUpperCase() != 'PLN') {
      code = currencyCode;
    }
    const url = `${credentials.CURRENCY_API_URL}/${code}/?format=json`;


    const response = await fetch(url);
    const result = await response.json();

    if (response.ok) {
      setCurrencyRate(result);
    } else {
      setErrorMessage(`Request ended with status ${response.errorMessage})`);
    }
  }

  if (currentLocation && currencyRate && currentWeather) {
    return (
      <View style={styles.centeredView}>
        <StatusBar style='auto' />
        <ReloadIcon load={load} />
        <HandleLocation currentLocation={currentLocation} />

        <View style={styles.details}>
          <View style={styles.detailsRow}>

            <View style={styles.detailsBox}>
              <HandleLink currentLocation={currentLocation} />
            </View>

            <View style={styles.detailsBox}>
              <WeatherInfo currentWeather={currentWeather} />
            </View>

            <View style={styles.detailsBox}>
              <HandleRate currentCurrency={currencyRate} />
            </View>

          </View>
        </View>
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.centeredView}>
        <Text>{errorMessage}</Text>
        <ReloadIcon load={load} />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <LoadingScreen />
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    margin: 0
  },
  details: {
    marginTop: 'auto',
    margin: 20
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailsBox: {
    flex: 1,
    padding: 5
  }
});