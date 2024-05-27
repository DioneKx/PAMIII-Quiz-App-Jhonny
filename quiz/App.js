import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native';
import { StackRoutes } from './src/routes/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackRoutes />
    </NavigationContainer>
  );
}
