import React, {Component} from 'react';
import {StackActions, NavigationActions } from 'react-navigation';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ImageBackground, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default class Login extends Component{
    
    state = { 
      username: '',
      password: '',
      error: '',
      isLoading: false,
      buttonDisabled: false,
    };

    handleUserNameChange = (username) => {
        this.setState({ username });
      };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleRecuperaSenhaPress = () => {
        this.props.navigation.navigate('RecuperarSenha');
    };

    handleSignInPress = async () => {
      Keyboard.dismiss();
      this.setState({isLoading: true});
      this.setState({error: ''});
      if (this.state.username.length === 0 || this.state.password.length === 0) {
        this.setState({ error: 'Preencha o usuário e senha para continuar!' }, () => false);
        this.setState({ isLoading: false });
      }else{
        try {
          const response = await api.get('/loginApp', {
            params:{
              ds_usuas_login: this.state.username,
              ds_usuas_senha: this.state.password
            }
          });
          if(response.data.data['usuario']){
            const usuas = response.data.data['usuario'];
            const clientes = response.data.data['clientes'];
            clientes[0].push({'value': 'todos', 'label': 'TODOS'});
            
            await AsyncStorage.multiSet([
              ['@LuvepApp:usuas' , JSON.stringify(usuas)] 
            ]);

            await AsyncStorage.multiSet([
              ['@LuvepApp:clientes' , JSON.stringify(clientes)] 
            ]);

            await AsyncStorage.setItem('@LuvepApp:clienteSelecionado', clientes[0][0]['value']);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            this.props.navigation.dispatch(resetAction);
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
      }
    };

    async componentDidMount(){
      const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
      if(usuas){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        this.props.navigation.dispatch(resetAction)
      }
    }
    
  render() {
    return (
        <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        >
          <ImageBackground source={require('../../images/background_login.jpg')} style={styles.imgBackGround}>
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss()}>
              <View style={styles.container}>
                <Image 
                  source={require('../../images/logo_luvep.png')} 
                  style={styles.logo}
                />
                <TextInput 
                  style={styles.input} 
                  placeholder="Usuário" 
                  placeholderTextColor="#d8d8d8"
                  keyboardType="email-address"
                  value={this.state.username}
                  onChangeText={this.handleUserNameChange}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  autoCorrect={false}
                />

                <TextInput 
                  style={styles.input} 
                  placeholder="Senha" 
                  placeholderTextColor="#d8d8d8"
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  secureTextEntry={true}
                  returnKeyType="go"
                  autoCorrect={false}
                  onSubmitEditing={() => this.handleSignInPress()}
                  ref = {(input) => this.passwordInput = input}
                />

                  {this.state.error.length !== 0 && <Text style={styles.textError}>{this.state.error}</Text>}

                <TouchableOpacity style={styles.button} onPress={this.handleSignInPress} disabled={this.state.buttonDisabled}>
                  {!this.state.isLoading && <Text style={styles.buttonText}>Login</Text>}
                  {this.state.isLoading && <ActivityIndicator style={{marginBottom: 6}} size="large" color="#fff"/>}
                </TouchableOpacity>

                <TouchableOpacity onPress={this.handleRecuperaSenhaPress}>
                  <View style={styles.signup}>
                      <Text style={styles.signupText}>Esqueceu sua senha?</Text>
                      <Text style={styles.signupButton}>Recupere</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </TouchableWithoutFeedback>
          </ImageBackground>
        </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackGround: {
    width: '100%', 
    height: '100%'
  },
  logo: {
    width:260, 
    height: 110,
    marginVertical: 30
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },
  button: {
    width: 350,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#256cb7',
    marginVertical: 10,
    paddingVertical: 15
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  signup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  signupText: {
    color: '#444343',
    fontSize: 16
  },
  signupButton: {
    marginLeft: 3,
    color: '#256cb7',
    fontSize: 16,
    fontWeight: '500'
  },
  textError: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginTop: 15,
  }
});
