import React, {Component} from 'react';
import {  
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import NomeCliente from '../../components/nomeCliente';
import Promocao from '../../components/promocao';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
export default class Promocoes extends Component{
  constructor(){
    super();
  }
  state = {
    promocoes: [],
    refreshing: false,
    isLoading: false
  }
  async componentDidMount(){
    this.setState({isLoading: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    this.setState({nome: usuas.nm_usuas});
    try {
      const response = await api.post('/getPromocao', {
        cd_usuas: usuas[0].cd_usuas,
      })
      if(response.data.errors == '' && response.status == 200){
        const promocoes = response.data.data[0];
        this.setState({promocoes});
        if(promocoes.length == 0){
          this.setState({
            error: 'Nenhuma promoção identificada...'
          });  
        }
      }else{
        this.setState({
          error: 'Nenhuma promoção...'
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
    try {
      const response = await api.post('/getPromocao', {
        cd_usuas: usuas[0].cd_usuas,
      })
      if(response.data.errors == '' && response.status == 200){
        const promocoes = response.data.data[0];
        this.setState({promocoes});
        if(promocoes.length == 0){
          this.setState({
            error: 'Nenhuma promoção identificada...'
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

  render() {
    return (
      <View>
          <NomeCliente navigation={this.props.navigation} pagina={"Promocoes"}/>
          <View style={styles.errors}>
            {this.state.isLoading && <ActivityIndicator style={{marginTop: 40}} size="large" />}
          </View>
          <FlatList
            style={{height: '94%'}}
            data={this.state.promocoes}
            renderItem={({item}) => <Promocao promocao={item} />}
            keyExtractor = { item => item.cd_promocao}
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