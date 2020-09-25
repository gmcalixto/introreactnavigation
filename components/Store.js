import { createStore } from 'redux'


//reducer para controle do usuário
function loginData(
  state = {
  userName: '',
  token: '',
  nav: null}, action){

  switch(action.type){
    case 'CHANGE_USER':
      console.log('User: ' + action.text)
      state.userName = action.text
      return state
    case 'CHANGE_TOKEN':
    console.log('Token: ' + action.text)
      state.token = action.text
      return state
    case 'CHANGE_NAV':
      console.log('Navigation: ' + action.obj)
      state.nav = action.obj
      return state
    case 'RESET':

      console.log('Reset')

      state.nav.popToTop()

      state.userName = ''
      state.token = ''
      state.nav = null
      return state
    default:
      return state
  }
}

//cria store visivel em toda a solução
let loginStore = createStore(loginData)


//exportação para permitir visibilidade
export{
  loginStore
}
