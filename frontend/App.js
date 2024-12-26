import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from './screens/LoginScreen';
import PatientHomeScreen from './screens/PatientHomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='PatientHomeScreen' component={PatientHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}