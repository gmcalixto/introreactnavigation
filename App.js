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
import {userContext} from './components/userContext';


//uso de Hooks para criação de objetos
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//header usado somente no login
function LogoSimple() {

  return (
    <View style={{
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center'
    }}>
      <Image
        style={{ width: 200, height: 50 }}
        source={require('./images/fiap.jpg')}
      />
    </View>
  );
}

//header da home - atualizada com o navigation drawer
function LogoTitle() {
  //objeto de controle de navegação
  const navigation = useNavigation();
  const route = useRoute();

  const {user} = route.params
  const {token} = route.params

  console.log(user)
  console.log(token)

  return (
    <View>
      <View style={{
        flex: 1,
        flexDirection:'row'
      }}>
        <Entypo name="menu" size={40} color="black" 
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
        <Image
          style={{ width: 200, height: 50 }}
          source={require('./images/fiap.jpg')}
        />
        <Entypo name="log-out" size={40} color="black" 
          onPress={()=> navigation.popToTop()}/>
      </View>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text>Bem vindo {user}</Text>
      </View>
    </View>
  );
}


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
                <Text>Tela de Opcões</Text>
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
                <Text>App FIAP Versão 1.0</Text>
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
