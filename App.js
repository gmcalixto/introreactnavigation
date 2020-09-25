import React,{Component, useState} from 'react';
//importações do React Navigation
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//importação do contexto
import {userContext} from './components/userContext';

//importação dos componentes de tela
import {LogoTitle,LogoSimple} from './components/Header'

//import do Provider do Redux
import {loginStore} from './components/Store'

import {TelaLogin} from './components/Login'
import {MainScreen} from './components/AppStack'

//uso de Hooks para criação de objetos
const Stack = createStackNavigator();


//renderiza o navigation drawer
class App extends Component {

  //state referente ao contexto
  constructor(props){
    super(props)

    this.state = {
      userName: 'username',
      token: 'token',
      navigation: null
    }

    this.setUser = this.setUser.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setNavigation = this.setNavigation.bind(this);


  }


  //altera o usuario
  setUser(usr){
    this.setState({user: usr})
  }

  //altera o token
  setToken(tk){
    this.setState({token: tk})
  }

  //altera o token
  setNavigation(nav){
    this.setState({navigation: nav})
  }

  render(){

     //objeto a ser passado no provider
    const loginValue = {
        user: this.state.user,
        token: this.state.token,
        nav: this.state.navigation,
        changeUser: this.setUser,
        changeToken: this.setToken,
        changeNav: this.setNavigation
    }
  
    //renderização raiz com o contexto de usuário
    return (

      <userContext.Provider value={loginValue}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              options={{headerTitle: props => <LogoSimple/>}}>
              {props => <TelaLogin/>}
            </Stack.Screen>
            <Stack.Screen
              name="Main"
              options={{headerTitle: props => <LogoTitle/>, headerLeft: null}}>
              {props => <MainScreen/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>

      </userContext.Provider>
  );
  }
} export default App

