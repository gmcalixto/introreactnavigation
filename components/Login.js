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

//uso do Redux para guardar dados do usuário
import {loginStore} from './Store'

//TelaLogin usando contexto
function TelaLogin(){
  
  //hooks de navegação e states para capturar dados de usuário e senha
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading,setLoading] = useState(false);

//personaliza renderização da mensagem para o sistema operacional específico
function showMessage(message){
  if(Platform.OS === 'android'){
    ToastAndroid.show(message,ToastAndroid.SHORT)
  }
  else if(Platform.OS === 'ios'){
    Alert.alert("FIAP",message)
  }
  else{
    alert(message)
  }
}

function updateLoginStore(_user,_token,_nav){
  
  //action para user
  var text = _user
  var action = {
    type: 'CHANGE_USER',
    text
  }
  loginStore.dispatch(action)

  //action para token
  text = _token
  action = {
    type: 'CHANGE_TOKEN',
    text
  }
  loginStore.dispatch(action)

  let obj = _nav
  let nav_action ={
    type: 'CHANGE_NAV',
    obj
  }
  loginStore.dispatch(nav_action)
}

  //verificar credenciais do usuário para acesso à aplicação
  //checkPost alterado para usar funções de contexto
 function checkPost(userFn,tokenFn,navFn){

    //objeto que será passado pelo navigation
    var obj = {
      user: user,
      token: '',
    }


    setLoading(true);

    fetch('https://reqres.in/api/login',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user,
        password: password,
      }),
    }).then((response)=> {
      response.json().then((result) => {
        //aqui é analisada a resposta

        if(response.status === 200){
          obj.token = result['token']

          //alimenta o contexto
          userFn(user)
          tokenFn(result['token'])
          navFn(navigation)

          
          //alimenta o store (Redux)
          updateLoginStore(user,result['token'],navigation)
          

          navigation.navigate('Main',obj)
        }
        else{
          console.log(result)
          showMessage(result['error'])
        }

        setLoading(false);

      })
    })
  }


  return(

    <userContext.Consumer>
      {({user, token, nav,changeUser, changeToken, changeNav}) => (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Usuário</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode={true}
            style={styles.textInput}
            onChangeText={(value) => setUser(value)}/>

          <Text style={styles.paragraph}>Senha</Text>

          <TextInput
            autoCorrect={false}
            secureTextEntry={true}
            clearButtonMode={true}
            style={styles.textInput}
            onChangeText={(value) => setPassword(value)}/>

          <TouchableOpacity
            style={styles.paragraph}
            onPress={() => checkPost(changeUser,changeToken, changeNav)}>
            <View style={styles.button}>
              {loading
                ? <ActivityIndicator size='small' color='blue'/>
                : <Text style={{alignSelf: 'center'}}>Entrar</Text>
              }
            </View>
          </TouchableOpacity>
      
        </View>
      )}

    </userContext.Consumer>
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
  textInput:{
    backgroundColor: '#AAA',
    color:'white',
    height: 40,
    width: 250,
    marginTop: 5,
    marginHorizontal: 20,
    paddingHorizontal:10,
    alignSelf: 'center'
  },
  button:{
    justifyContent: 'center',
    backgroundColor: '#AAA',
    color:'white',
    height: 40,
    width: 150,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal:10,
    alignSelf: 'center'
  }
});

export{
  TelaLogin
}