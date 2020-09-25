import React,{Component, useState} from 'react';
import { Text, 
         View, 
         StyleSheet, 
         Button, 
         Image, 
         TextInput, 
         TouchableOpacity, 
         ActivityIndicator,
         Platform,
         ToastAndroid,
         Alert } from 'react-native';

import Constants from 'expo-constants';

//importações do React Navigation
import { NavigationContainer, DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

//módulo do Tab Navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//biblioteca de icones
import { Ionicons, Entypo } from '@expo/vector-icons';

//módulo do Navigation Drawer
import {createDrawerNavigator} from '@react-navigation/drawer';

//importação do contexto
import {userContext} from './userContext';

//importação dos componentes de tela
import {LogoTitle,LogoSimple} from './Header'
import {OptionsScreen,
        AboutScreen,
        TelaInicial,
        TelaDetalhes,
        TelaUsuario} from './Telas'

//uso de Hooks para criação de objetos
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


//stacks do App da aula anterior
function AppStack(){
  return(
    <Stack.Navigator>  
          <Stack.Screen
            name='Home'
            options={{ headerTitle: props => <LogoTitle/> }}>
            {props => <TelaInicial />}
          </Stack.Screen>

          <Stack.Screen
            name='Detalhes'
            options={{title: 'Tela de Detalhes'}}>
            {props => <TelaDetalhes />}
          </Stack.Screen>

          <Stack.Screen
            name='Usuario'
            options={{title: 'Dados do Usuário'}}>
            {props => <TelaUsuario />}
          </Stack.Screen>
        </Stack.Navigator>

  );
}


//renderiza o tab e por sua vez as stacks
function AppTabScreen({routeName}){
  return(
          <Tab.Navigator
          initialRouteName={routeName}
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'App') {
              iconName = 'ios-home';
            } 
            else if (route.name === 'Options') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === 'About') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            // Qualquer componente pode ser usado
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >

          <Tab.Screen name="App" component={AppStack}/>
          <Tab.Screen name="Options" component={OptionsScreen}/>
          <Tab.Screen name="About" component={AboutScreen}/>

        </Tab.Navigator>
  );
}

function MainScreen(){
  return(
        <Drawer.Navigator initialRouteName="App">
          <Drawer.Screen name="App">
             {props => <AppTabScreen routeName="App"/>} 
          </Drawer.Screen>
          <Drawer.Screen name="Options">
             {props => <AppTabScreen routeName="Options"/>} 
          </Drawer.Screen>
          <Drawer.Screen name="About">
             {props => <AppTabScreen routeName="About"/>} 
          </Drawer.Screen>
        </Drawer.Navigator>
  );
}

export{
  MainScreen
}