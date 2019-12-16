import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';
import SelectInput from 'react-native-select-input-ios'
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
export default class NomeCliente extends Component{
  constructor(){
    super();
  }
  state = {
    seleted: 0,
    options: []
  };
  async componentDidMount(){
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    const clientes = JSON.parse(await AsyncStorage.getItem('@LuvepApp:clientes'));
    if(clientes[0]){
      this.setState({options: clientes[0]});
      this.setState({seleted: clienteSelecionado});
    }
  }
  async handleCliente(cliente){
    await AsyncStorage.setItem('@LuvepApp:clienteSelecionado', cliente);
    this.setState({ seleted: cliente });
    try {
      // await AsyncStorage.removeItem('@LuvepApp:usuas');
      const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' , params: { 'tela': this.props.pagina }})],
      });
      this.props.navigation.dispatch(resetAction);
    }catch(exception) {
        console.log(exception);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <SelectInput 
        hitSlop={{ right: 40 }}
        // mode="dropdown"
        cancelKeyText="Cancelar"
        submitKeyText="Confirmar"//dentro de -> node_modules/react-native-select-input-ios/src/components/KeyBoardButton/KeyBoardButton.js adicionar a estilizacao do botao
        submitKeyStyle={{color:'red'}}
        style={{zIndex: 1}}
        labelStyle={[styles.cliente,{marginTop: 10, marginBottom: 10,marginLeft: 10, marginRight: 15}]} 
        buttonsTextStyle={{backgroundColor: '#fff'}} 
        buttonsViewStyle={{backgroundColor: '#fff'}}
        // pickerItemsStyle={{color: 'red'}}
        // pickerViewStyle={{backgroundColor: 'pink'}}
        value={this.state.seleted} 
        options={this.state.options} 
        onSubmitEditing={(seleted) => this.handleCliente(seleted)}
        />
        <Ionicons
          name="ios-arrow-down"
          size={20} 
          color={'#fff'}  
          style={{marginLeft: -12, marginTop: 2}}
        />
      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 18,
    height: 40,
    backgroundColor: '#0b1856',
    // backgroundColor: '#fff',
  },
  cliente: {
    fontFamily: 'Helvetica',
    height: 17,
    color: 'white',
    fontWeight: 'bold',
  }
});
