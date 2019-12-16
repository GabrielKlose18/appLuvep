import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ImageBackground, 
    TextInput, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';


export default class Login extends Component{
    
    state = { email: '', password: '', error: '' };

    handleEmailChange = (email) => {
        this.setState({ email });
      };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        this.props.navigation.navigate('Login');
    };
    
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
                  placeholder="Email" 
                  placeholderTextColor="#d8d8d8"
                  onChangeText={this.handleEmailChange}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

              

              <TouchableOpacity onPress={this.handleCreateAccountPress}>
                <View style={styles.signup}>
                    <Text style={styles.signupButton}>Fazer Login</Text>
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
    paddingVertical: 16,
  },
  signupButton: {
    marginLeft: 3,
    color: '#256cb7',
    fontSize: 16,
    fontWeight: '500'
  }
});
