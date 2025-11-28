import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  Keyboard,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '5e1add9610a779d461d69ecb651eceae'; 

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    Keyboard.dismiss();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError("Cidade não encontrada 😔");
      }
    } catch (e) {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Weather App</Text>

        <View style={styles.searchContainer}>
          <Feather name="map-pin" size={20} color="#666" style={{marginLeft: 10}} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua cidade..."
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
            <Feather name="search" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#FFF" style={{marginTop: 50}} />}

        {error && (
          <View style={styles.errorContainer}>
            <Feather name="alert-circle" size={40} color="#FF6B6B" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {weatherData && (
          <View style={styles.card}>
            <Text style={styles.cityName}>
              {weatherData.name}, <Text style={styles.country}>{weatherData.sys.country}</Text>
            </Text>
            
            <Text style={styles.date}>Agora</Text>

            <View style={styles.mainInfo}>
              <Image
                style={styles.weatherIcon}
                source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png` }}
              />
              <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°</Text>
            </View>

            <Text style={styles.description}>
              {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
            </Text>

            <View style={styles.divider} />

            <View style={styles.extraInfoContainer}>
              <View style={styles.extraInfoItem}>
                <Feather name="droplet" size={24} color="#FFF" />
                <Text style={styles.extraInfoValue}>{weatherData.main.humidity}%</Text>
                <Text style={styles.extraInfoLabel}>Umidade</Text>
              </View>

              <View style={styles.extraInfoItem}>
                <Feather name="wind" size={24} color="#FFF" />
                <Text style={styles.extraInfoValue}>{weatherData.wind.speed} km/h</Text>
                <Text style={styles.extraInfoLabel}>Vento</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
    fontFamily: 'System', 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4c669f',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 30,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  country: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#DDD',
  },
  date: {
    fontSize: 14,
    color: '#EEE',
    marginTop: 5,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#FFF',
  },
  description: {
    fontSize: 20,
    color: '#FFF',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  extraInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  extraInfoItem: {
    alignItems: 'center',
  },
  extraInfoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 5,
  },
  extraInfoLabel: {
    fontSize: 12,
    color: '#DDD',
  },
  errorContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});