import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import Details from '~/pages/Deliveries/Delivery/Details';
import NewProblem from '~/pages/Deliveries/Delivery/Details/NewProblem';
import ViewProblem from '~/pages/Deliveries/Delivery/Details/ViewProblem';
import Confirm from '~/pages/Deliveries/Delivery/Details/Confirm';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTransparent: true,
      }}
      initialRouteName="Entregas"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Entregas"
        component={Deliveries}
      />
      <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da encomenda',
        }}
        component={Details}
      />
      <Stack.Screen
        name="InformarProblema"
        options={{
          title: 'Informar Problema',
        }}
        component={NewProblem}
      />
      <Stack.Screen
        name="VisualizarProblema"
        options={{
          title: 'Visualizar problema',
        }}
        component={ViewProblem}
      />
      <Stack.Screen
        name="ConfirmarEntrega"
        options={{
          title: 'Confirmar Entrega',
        }}
        component={Confirm}
      />
    </Stack.Navigator>
  );
}
