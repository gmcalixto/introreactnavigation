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

//importação do contexto
import {userContext} from './userContext'

//importação dos componentes de tela
import {LogoTitle,LogoSimple} from './Header'


//uso de Hooks para criação de objetos
const Stack = createStackNavigator();

//importacao do consumer do Redux
//import { ReactReduxContext } from 'react-redux'
import {loginStore} from './Store'


//função que retorna stack referente a opções
function OptionsScreen(){
  return(

         <Stack.Navigator>
          <Stack.Screen
            name="Options"
            options={
              {headerTitle: props => <LogoTitle/>}}>
              {props => 
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Consumo do Redux</Text>
                    <Text>User: {loginStore.getState().userName}</Text>
                    <Text>Token: {loginStore.getState().token}</Text>
                    <Button title='logoff' onPress={() => loginStore.dispatch({type:'RESET'})}/>
              
                  </View>  
              }
          </Stack.Screen>
        </Stack.Navigator>
      

   
  );
}


//função que retorna stack referente a sobre
function AboutScreen(){
  return(
  <userContext.Consumer>
      {({user, token, nav,changeUser, changeToken, changeNav}) => (
    
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        options={
          {headerTitle: props => <LogoTitle/>}}>
          {props => 
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Uso de Contexto</Text>
                <Text>Usuário: {user}</Text>
                <Text>Token: {token}</Text>
                <Button title='logout' onPress={() => nav.popToTop()}/>
               </View>  
          }
      </Stack.Screen>
    </Stack.Navigator>

      )}
    </userContext.Consumer>
  );
}


//tela inicial
function TelaInicial() {
  //objeto de controle de navegação
  const navigation = useNavigation();
  
  //objeto passado para outra tela
  var obj = {
          nome: 'Aluno',
          sobrenome: 'FIAP'
        };

  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Primeiro teste do React Navigation</Text>
      <Button
        title='Tela de Detalhes'
        onPress={() => navigation.navigate('Detalhes')}
      />
      <Button
        title='Dados do Usuário'
        onPress={() => navigation.navigate('Usuario',obj)}
      />
    </View>
  );
}

//tela de detalhes
function TelaDetalhes() {
  //objeto de controle de navegação
  const navigation = useNavigation();

  //recebendo dados da tela anterior
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Minha tela de detalhes</Text>
      <Button
        title='Voltar'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}


//tela do usuario
function TelaUsuario() {
  
  //objeto de controle de navegação
  const navigation = useNavigation();

  //objeto route para obter dados da tela anterior
  const route = useRoute();

  //fazendo o fetch do objeto recebido da tela anterior
  const {nome} = route.params;
  const {sobrenome} = route.params;
  
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Nome:{nome}</Text>
      <Text style={styles.paragraph}>Sobrenome: {JSON.stringify(sobrenome)} </Text>
      <Button
        title='Voltar'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export{
  OptionsScreen,AboutScreen,TelaInicial,TelaDetalhes,TelaUsuario
}
