import React, {Component} from 'react';
import { 
    Platform,
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    ActivityIndicator,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Stars from 'react-native-stars';

import NomeCliente from '../../components/nomeCliente';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';


export default class Home extends Component{
  state = { 
    stars : 0,
    comentario: '',
    lengthComentario: 0,
    error: '',
    isLoading: false,
    refreshing: false,
    nome: '',
    agendamento: []
  };
  handleComentario = (comentario) => {
    this.setState({ comentario });
    lengthComentario = comentario.length;
    this.setState({ lengthComentario });
  };
  async componentDidMount(){
    this.setState({agendamento: this.props.navigation.state.params})
    this.setState({isLoading: true});
    const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
    this.setState({nome: usuas.nm_usuas});
    this.setState({isLoading: false});
  }
  
  handleAvaliaPress = async () => {
    Keyboard.dismiss();
    this.setState({isLoading: true});
    this.setState({error: ''});
    
    try {
    const response = await api.post('/avaliacao', {
        cd_agendamento: this.state.agendamento.cd_agendamento,
        ds_avaliacao: this.state.comentario,
        qt_avaliacao_estrela: this.state.stars,
        ds_usuas_senha: this.state.password
    });
    console.log(response.data);
    if(response.data.success){
        this.props.navigation.navigate('Historico', 'ok');
    }else if(response.data.errors != ''){
        this.setState({error: response.data.errors});
    }else{
        this.setState({error: 'Ops! Houve um problema e não foi possível conectar.'});
    }  
    } catch (error) {
        console.log(error);
        this.setState({error: 'Ops! Houve um problema e não foi possível conectar.'});
    }
    this.setState({isLoading: false});
  };
  render() {
    return (
      <View style={{flex:1}}> 
         <StatusBar 
          barStyle="light-content"
        />
        <NomeCliente navigation={this.props.navigation} nm_usuas={this.state.nome} pagina={"Avaliacao"}/>
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
            <View style={{flex:1, padding: 20}}>

                <View> 
                    <View style={styles.errors}>
                    {this.state.error.length !== 0  && <Text style={{marginTop: 10, marginBottom:10}}>{this.state.error}</Text>}
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <View style={{marginBottom: 10 , alignItems: 'center'}}>
                            <Text style={styles.textEscolha}>Como foi a sua experiência?</Text>
                            <Text style={styles.textEscolhaSub}>Escolha de 1 a 5 estrelas para classificar.</Text>
                        </View>
                        <Stars
                            half={false}
                            default={0}
                            update={(val)=>{this.setState({stars: val})}}
                            spacing={5}
                            count={5}
                            fullStar={
                                <Ionicons
                                    name="ios-star"
                                    size={40} 
                                    color={'#ffcc66'}  
                                />
                            }
                            emptyStar={
                                <Ionicons
                                    name="ios-star-outline"
                                    size={40} 
                                    color={'#ffcc66'}  
                                />
                            }
                            halfStar={
                                <Ionicons
                                    name="ios-star-half"
                                    size={40} 
                                    color={'#ffcc66'}  
                                />
                            }
                        />
                    </View>

                    <View style={{marginTop: 30}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Text style={styles.textEscolha}>Deixar comentário</Text>
                            <Text style={styles.textEscolhaSub}>{this.state.lengthComentario}/200</Text>
                        </View>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Conte-nos o que aconteceu (opcional)" 
                            placeholderTextColor="#d8d8d8"
                            value={this.state.comentario}
                            onChangeText={this.handleComentario}
                            autoCapitalize="none"
                            autoCorrect={true}
                            multiline={true}
                            maxLength={200}
                        />
                    </View>

                </View>

                <View>
                    <TouchableOpacity style={[styles.button,{opacity: this.state.stars == 0 ? 0.3 : 1}]} onPress={this.handleAvaliaPress} disabled={ this.state.stars == 0 ? true : false } >
                        {!this.state.isLoading && <Text style={styles.buttonText}>Avaliar</Text>}
                        {this.state.isLoading && <ActivityIndicator style={{marginBottom: 6}} size="large" color="#fff"/>}
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableWithoutFeedback>
      </View>

      
    )
  }
  
}

const styles = StyleSheet.create({
    textEscolha:{
        fontWeight: '500',
        fontSize: 16,
        color: '#616161'
    },
    textEscolhaSub: {
        fontSize: 12,
        marginTop: 2,
        color: '#8b8b8b'
    },
    errors: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8b8b8b',
        // paddingTop: 13,
        ...Platform.select({
            ios: {
                paddingTop: 13,
            },
            android: {
                textAlignVertical: 'top'
            }
        }),
        paddingLeft: 13,
        fontSize: 16,
        marginTop: 5
    },
    button: {
        width: '100%',
        height: 50,     
        borderRadius: 10,  
        backgroundColor: '#256cb7',
        marginVertical: 10,
        paddingVertical: 15
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
});