import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { 
    StyleSheet,
    View, 
    TouchableOpacity,
} from 'react-native';
import { StackActions, withNavigation, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component{
    handleLogoffPress = async () => {
        try {
            await AsyncStorage.removeItem('@LuvepApp:usuas');
            await AsyncStorage.removeItem('@LuvepApp:clientes');
            await AsyncStorage.removeItem('@LuvepApp:clienteSelecionado');
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            this.props.navigation.dispatch(resetAction)
        }catch(exception) {
            return false;
        }
    };
  render() {
    return (
        <View style={styles.buttonPowerOff}>
            <TouchableOpacity style={styles.buttonPowerOffTouch} onPress={this.handleLogoffPress}>
                <MaterialIcons
                    name='exit-to-app'
                    size={20}
                    color={'#fff'}
                />
            </TouchableOpacity>
        </View>
    )
  }
  
}
export default withNavigation(Home);

const styles = StyleSheet.create({
    buttonPowerOff: {
        marginRight: 10, 
        // backgroundColor: 'red', 
    },
    buttonPowerOffTouch: {
        height:35, 
        width: 35, 
        alignItems: 'center',
        justifyContent: 'center'
    }
});