import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  Keyboard 
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Substitua pela sua chave da OpenWeatherMap
  const API_KEY = 'SUA_CHAVE_DE_API_AQUI'; 

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    Keyboard.dismiss();

    try {
      // Requisição HTTP para a API (Units=metric para Celsius)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError("Cidade não encontrada. Tente novamente.");
      }
    } catch (e) {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>

      {/* Área de Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da cidade"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Loading */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 20}} />}

      {/* Mensagem de Erro */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Exibição dos Dados */}
      {weatherData && (
        <View style={styles.resultContainer}>
          <Text style={styles.cityName}>{weatherData.name}, {weatherData.sys.country}</Text>
          
          <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
          
          <Text style={styles.description}>
            {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
          </Text>

          {/* Ícone vindo diretamente da API */}
          <Image
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cityName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  }
});