//importações do React
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

//importações do React Navigation
import { NavigationContainer, DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

//biblioteca de icones
import { Ionicons, Entypo } from '@expo/vector-icons';


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
        source={require('../images/fiap.jpg')}
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
          source={require('../images/fiap.jpg')}
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

export {
  LogoSimple,LogoTitle

}