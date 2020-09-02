import React,{Component,useState} from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';

//importações do React Navigation
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


//módulo do Tab Navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//biblioteca de icones
import { Ionicons } from '@expo/vector-icons';

//módulo do Navigation Drawer
import {createDrawerNavigator} from '@react-navigation/drawer';


//uso de Hooks para criação de objetos
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();



//header da home - atualizado com um botão
function LogoTitle() {
  const navigation = useNavigation();
  
  return (
    <View style={{
      flex: 1,
      flexDirection:'row'
    }}>
      <Button
        title="Menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
      <Image
        style={{ width: 200, height: 50 }}
        source={require('./images/fiap.jpg')}
      />
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
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        options={
          {headerTitle: props => <LogoTitle/>}}>
          {props => 
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>App FIAP Versão 1.0</Text>
               </View>  
          }
      </Stack.Screen>
    </Stack.Navigator>
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
        title='Tela de Avisos'
        onPress={() => navigation.navigate('Avisos')}
      />
      <Button
        title='Dados do Usuário'
        onPress={() => navigation.navigate('Usuario',obj)}
      />
    </View>
  );
}

//tela de detalhes
function TelaDetalhes({texto}) {
  //variavel texto recebendo conteúdo da função que gerencia as stacks
  
  //objeto de controle de navegação
  const navigation = useNavigation();

  //recebendo dados da tela anterior


  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>{texto}</Text>
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
  //hooks declarados dentro da função (elas ficam dentro deste escopo)
  const [texto, setTexto] = useState('Texto da minha tela de detalhes');
  const [aviso, setAviso] = useState('Meus avisos');
  
  return(


    //Vejam que na stack eu uso a mesma tela de detalhes e vou alterando o texto conoforme a necessidade.Você pode usar estes hooks com state ou também pode ir usando o fetch em arquivo locais JSON.

    <Stack.Navigator>
          
          <Stack.Screen
            name='Home'
            options={{ headerTitle: props => <LogoTitle/> }}>
            {props => <TelaInicial />}
          </Stack.Screen>

          <Stack.Screen
            name='Detalhes'
            options={{title: 'Tela de Detalhes'}}>
            {props => <TelaDetalhes texto={texto}/>}
          </Stack.Screen>

          <Stack.Screen
            name='Avisos'
            options={{title: 'Tela de Avisos'}}>
            {props => <TelaDetalhes texto={aviso}/>}
          </Stack.Screen>

          <Stack.Screen
            name='Usuario'
            options={{title: 'Dados do Usuário'}}>
            {props => <TelaUsuario />}
          </Stack.Screen>


        </Stack.Navigator>

  );
}

//função que retorna a barra inferior com icones
function AppBottonTabs({routeName}){
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

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="App">
            {props => <AppBottonTabs routeName="App"/>}
          </Drawer.Screen>
          <Drawer.Screen name="Options">
            {props => <AppBottonTabs routeName="Options"/>}
          </Drawer.Screen>
          <Drawer.Screen name="About">
            {props => <AppBottonTabs routeName="About"/>}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
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
});
