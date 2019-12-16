import React, {Component} from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    FlatList,
    TextInput,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import NomeCliente from '../../components/nomeCliente';
import UltimaAtualizacao from '../../components/ultimaAtualizacao';
import Notificacao from '../../components/notificacao';
import {date} from '../../utils/notifications';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default class Andamento extends Component{

  constructor(){
    super();
  }
  state = {
    staticAndamentos: [],
    andamentos: [],
    search: "",
    loading : false,
    query: "",
    isLoading: false,
    refreshing: false,
    error: '',
  }
  handleSearch = (query) => {
    if(query.trim() == ""){
      this.setState({ andamentos: this.state.staticAndamentos });
    }else{
      const cont = this.state.staticAndamentos.length;
      const data = this.state.staticAndamentos;
      var newData = []
      for (let i = 0; i < cont; i++) {
        if(data[i].title.toUpperCase().includes(query.toUpperCase())){
          newData.push(data[i]);
        }
      }
      this.setState({ andamentos: newData });
    }
    this.setState({ query });

  };
  async componentDidMount(){
    this.setState({isLoading: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    try {
      const response = await api.post('/getAndamento', {
        cd_usuas: usuas[0].cd_usuas,
        cd_cliente: clienteSelecionado,
      });
      if(response.data.errors == '' && response.status == 200){
        const andamentos = response.data.data[0];
        this.setState({andamentos});
        this.setState({staticAndamentos: andamentos});
        if(andamentos.length == 0){
          this.setState({
            error: 'Nenhuma atualização...'
          });  
        }
      }else{
        this.setState({
          error: 'Nenhuma atualização...'
        });  
      }
    } catch (error) {
      this.setState({error: 'Ops... erro inesperado'});
    }
    this.setState({isLoading: false});
  }

  _onRefresh = async () => {
    this.setState({refreshing: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    const clienteSelecionado = await AsyncStorage.getItem('@LuvepApp:clienteSelecionado');
    try {
      const response = await api.post('/getAndamento', {
        cd_usuas: usuas[0].cd_usuas,
        cd_cliente: clienteSelecionado
      })
      
      if(response.data.errors == '' && response.status == 200){
        const andamentos = response.data.data[0];
        this.setState({andamentos});
        this.setState({staticAndamentos: andamentos});
        if(andamentos.length == 0){
          this.setState({
            error: 'Nenhuma atualização...'
          });  
        }
      }else{
        this.setState({
          error: 'Nenhuma atualização...'
        });  
      }
    } catch (error) {
      this.setState({error: 'Ops... erro inesperado'});
    }
    this.setState({refreshing: false});
  }

   
  render() {
    return (
      <View>
        <NomeCliente navigation={this.props.navigation} pagina={"Andamento"}/>
        
        {/* <UltimaAtualizacao /> */}
        {/* <ScrollView style={{height: '100%'}}> */}
        <View style={styles.FundoSearchBar}>
          <View style={styles.searchBar}>
            <IconFontAwesome
                name='search'
                size={20}
                color={'#d4d3d3'}
                
              />
            <TextInput
              placeholder="Buscar"
              style={styles.textSearchBar}
              value={this.state.query}
              onChangeText={this.handleSearch}
              autoCorrect={false}
            /> 
          </View>
        </View>
        <View style={styles.errors}>
          {this.state.isLoading && <ActivityIndicator style={{marginTop: 40}} size="large" />}
          {this.state.error.length !== 0  && <Text style={{marginTop: 40}}>{this.state.error}</Text>}
        </View>
        <FlatList
          style={{height: '94%'}}
          data={this.state.andamentos}
          renderItem={ ({item}) => <Notificacao andamento={item}/> }
          keyExtractor = { date => date.id_notification}
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
  FundoSearchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    height: 50,
    
  },
  searchBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ecebeb',
    height: 35,
    width: 340,
  },
  textSearchBar: {
    paddingHorizontal: 5,
    height: 30,
    width: 300,
    backgroundColor: '#ecebeb',
    borderRadius: 20
  },
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