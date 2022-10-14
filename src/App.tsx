import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './store';
import SetLimitScreen from './screens/SetLimitScreen';
import MainScreen from './screens/MainScreen';
import Strings from './strings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Strings.Main}
              options={{headerShown: false}}
              component={MainScreen}
            />
            <Stack.Screen
              name={Strings.SetLimit}
              component={SetLimitScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
