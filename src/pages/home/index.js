import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    StatusBar,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import BoxServico from '../../components/boxServico';
import NomeCliente from '../../components/nomeCliente';
import Anuncio from '../../components/anuncio';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';


export default class Home extends Component{
  constructor(props){ 
    super(props) 
  }
  state = { 
    agendamentos: [], 
    error: '',
    isLoading: false,
    refreshing: false,
  };

  async componentDidMount(){
    if(this.props.navigation.state.params){
        if(this.props.navigation.state.params.tela != "Home")
          this.props.navigation.navigate(this.props.navigation.state.params.tela);      
    }
    this.setState({isLoading: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    try {
      const response = await api.post('/getAgendamento', {
        cd_usuas: usuas.cd_usuas,
        cd_cliente: clienteSelecionado,
      })
      if(response.data.errors == '' && response.status == 200){
        const agendamentos = response.data.data[0];
        this.setState({agendamentos});
        if(agendamentos.length == 0){
          this.setState({
            error: 'Nenhum serviço agendado...'
          });  
        }
      }else{
        this.setState({
          error: 'Nenhum serviço agendado...'
        });  
      }
    } catch (error) {
      this.setState({error: 'Ops... erro inesperado'});
    }
    this.setState({isLoading: false});
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    try{
      const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
      const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
      const response = await api.post('/getAgendamento', {
        cd_usuas: usuas.cd_usuas,
        cd_cliente: clienteSelecionado,
      })
      if(response.data.errors == '' && response.status == 200){
        const agendamentos = response.data.data[0];
        this.setState({agendamentos});
        if(agendamentos.length == 0){
          this.setState({
            error: 'Nenhum serviço agendado...'
          });  
        }
      }else{
        this.setState({
          error: 'Ops... erro inesperado.'
        });  
      }
    } catch(response){
      console.log(response)
      this.setState({
        error: 'Ops... erro inesperado.'
      });
    }
    this.setState({refreshing: false});
  }

  render() {
    return (
      <View>
         <StatusBar 
          barStyle="light-content"
        />
        <NomeCliente navigation={this.props.navigation} pagina={"Home"}/>
        <Anuncio />
        <View style={styles.errors}>
          {this.state.isLoading && <ActivityIndicator style={{marginTop: 40}} size="large" />}
          {this.state.error.length !== 0  && <Text style={{marginTop: 40}}>{this.state.error}</Text>}
        </View>
        <FlatList
          style={{height: '94%'}}
          data={this.state.agendamentos}
          renderItem={({item}) => <BoxServico agendamento={item} />}
          keyExtractor = { (item) => item.cd_agendamento}
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