import React, {Component} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';


export default class UltimaAtualizacao extends Component{
  render() {
    return (
      <View style={styles.container}>
        
            <Entypo
                name="cycle"
                size={20}
                color={'#616161'}
            />
        
        
            <Text style={styles.cliente}>
                Última atualização em 24/03/2019 às 13:33h.
            </Text>
        </View>
      
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // height: 15,
    padding: 5,
    // height: 40,
    backgroundColor: '#ececec'
  },
  cliente: {
    marginLeft: 3,
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    height: 15,
    color: '#616161',
    // backgroundColor: 'blue'
  }
});
