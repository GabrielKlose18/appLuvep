import React, {Component} from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet, 
    View,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Text
} from 'react-native';

import _ from 'lodash';

import NomeCliente from '../../components/nomeCliente';
import Historicos from '../../components/historico';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import Toast from 'react-native-tiny-toast';

export default class Historico extends Component{

  state = { 
    historico: [], 
    error: '',
    isLoading: false,
    refreshing: false,
    nome: '',
    toastVisible: false
  };
  componentDidUpdate(){
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      if(this.props.navigation.state.params){
        if(this.props.navigation.state.params != 'tela'){
          this._onRefresh();
          setTimeout(() => this.setState({
            toastVisible: true
          }), 1000); // show toast after 2s
      
          setTimeout(() => this.setState({
            toastVisible: false
          }), 5000); // hide toast after 5s
          this.props.navigation.state.params = null;
        }
      }
    });
      
    
    
  }
  async componentDidMount(){
    this.setState({isLoading: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    this.setState({nome: usuas.nm_usuas});
    try {
      const response = await api.post('/getHistorico', {
        cd_usuas: usuas[0].cd_usuas,
        cd_cliente: clienteSelecionado,
      })
      if(response.data.errors == '' && response.status == 200){
        const historico = response.data.data[0];
        this.setState({historico});
        if(historico.length == 0){
          this.setState({
            error: 'Nenhum Historico...'
          });  
        }
      }else{
        this.setState({
          error: 'Nenhum historico...'
        });  
      }
    } catch (error) {
      console.log(error);
      this.setState({error: 'Ops... erro inesperado'});
    }
    this.setState({isLoading: false});
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    this.setState({nome: usuas.nm_usuas});
    try {
      const response = await api.post('/getHistorico', {
        cd_usuas: usuas[0].cd_usuas,
        cd_cliente: clienteSelecionado,
      })
      if(response.data.errors == '' && response.status == 200){
        const historico = response.data.data[0];
        this.setState({historico});
        if(historico.length == 0){
          this.setState({
            error: 'Nenhum Historico...'
          });  
        }
      }else{
        this.setState({
          error: 'Ops... erro inesperado'
        });  
      }
    } catch (error) {
      this.setState({error: 'Ops... erro inesperado'});
    }
    this.setState({refreshing: false});
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
   
  render() {
    return (
      <View>
        <NomeCliente navigation={this.props.navigation} nm_usuas={this.state.nome} pagina={"Historico"}/>
        <Toast
            visible={this.state.toastVisible}
            position={180}
            animationDuration={600}
            animation={true}
            // shadow={true}
            // textColor={'white'}
            // backgroundColor={'green'}
        >Serviço Avaliado com sucesso!</Toast>
        
        <View style={styles.errors}>
          {this.state.isLoading && <ActivityIndicator style={{marginTop: 40}} size="large" />}
          {this.state.error.length !== 0  && <Text style={{marginTop: 40}}>{this.state.error}</Text>}
        </View>
        <FlatList
          style={{height: '94%'}}
          data={this.state.historico}
          renderItem={({item}) => <Historicos navigation={this.props.navigation} historico={item} />}
          keyExtractor = { item => item.cd_agendamento}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        />

      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  text: {
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Helvetica',
    color: '#383638',
    fontWeight: '400',
  },
  errors: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
// const styles = StyleSheet.create({
//   FundoSearchBar: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingHorizontal: 5,
//     backgroundColor: '#ecebeb',
//     height: 50,
    
//   },
//   searchBar: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     borderRadius: 20,
//     backgroundColor: '#fff',
//     height: 35,
//     width: 340,
//   },
//   textSearchBar: {
//     paddingHorizontal: 5,
//     height: 30,
//     width: 300,
//     backgroundColor: '#fff',
//     borderRadius: 20
//   }
// });