import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Banco from './components/Banco'
import estilo  from './components/css/Estilo'


export default function App() {
  return (
    <ImageBackground
      source={require('./components/img/bg.jpg')}
      style={estilo.container}>
      <Banco/>
    </ImageBackground>
  );
}


