import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/SignIn';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={SignIn}
      />
    </Stack.Navigator>
  );
}
