import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainTabs from './src/navigation/MainTabs';
import ProfileScreen from './src/screens/ProfileScreen';
import WorkoutDetailScreen from './src/screens/WorkoutDetailScreen';
import MealCameraScreen from './src/screens/MealCameraScreen';
import MealResultScreen from './src/screens/MealResultScreen';
import SOSScreen from './src/screens/SOSScreen';
import SOSNotifiedScreen from './src/screens/SOSNotifiedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
        <Stack.Screen name="MealCamera" component={MealCameraScreen} />
        <Stack.Screen name="MealResult" component={MealResultScreen} />
        <Stack.Screen name="SOS" component={SOSScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="SOSNotified" component={SOSNotifiedScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
