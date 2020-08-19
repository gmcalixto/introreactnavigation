import React,{Component} from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';

//módulos do React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

//uso de Hooks para criar objetos
const Stack = createStackNavigator();

//header personalizado
function HeaderPersonalizado(){
  return(
    <Image
      style={{ width: 200, height: 50 }}
      source={require('./images/fiap.jpg')}
    />
  );
}

//tela inicial
function TelaInicial(){

  //chamada do objeto para gerir a navegação
  const navigation = useNavigation();


  //objeto que será passado para a tela de destino
  var obj = {
    nome: 'Aluno',
    sobrenome: 'FIAP'
  }

  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Tela Inicial</Text>
      <Button
        title='Ir para Detalhes'
        onPress={() => navigation.navigate('Detalhes')}/>
      <Button
        title='Ver usuário'
        onPress={() => navigation.navigate('Usuario',obj)}/>
    </View>
  );
}

//tela de detalhes
function TelaDetalhes(){
  
  //chamada do objeto para gerir a navegação
  const navigation = useNavigation();
  
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Exemplo de Detalhes</Text>
      <Button
        title='Voltar'
        onPress={() => navigation.goBack()}/>
    </View>
  );
}

//recebendo dados de uma tela anterior
function TelaDadosUsuario(){
  
  //chamada do objeto para gerir a navegação
  const route = useRoute();

  //recebendo objeto de uma origem de navegação
  const {nome} = route.params;
  const {sobrenome} = route.params;
  
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>Nome: {nome} </Text>
      <Text style={styles.paragraph}>Sobrenome: {sobrenome} </Text>
    </View>
  );
}


class App extends Component {
  render(){
    return (
    
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name='Home'
            options={{headerTitle: props => <HeaderPersonalizado/>}}>
            {props => <TelaInicial/>}
          </Stack.Screen>

          <Stack.Screen
            name='Detalhes'
            options={{title: 'Tela de Detalhes'}}>
            {props => <TelaDetalhes/>}
          </Stack.Screen>

          <Stack.Screen
            name='Usuario'
            options={{title: 'Dados do Usuário'}}>
            {props => <TelaDadosUsuario/>}
          </Stack.Screen>

        </Stack.Navigator>
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