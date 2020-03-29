import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import DeliveriesRoutes from './Delivery.routes';
import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

export default function routes() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#7159c1',
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen
          name="Entregas"
          component={DeliveriesRoutes}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Icon name="reorder" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Meu Perfil"
          component={Profile}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Icon name="account-circle" size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
