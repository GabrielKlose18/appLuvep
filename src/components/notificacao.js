import React, {Component} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image
} from 'react-native';


export default class Notificacao extends Component{
  
  render() {
    return (
        <View style={[styles.boxNotification,{backgroundColor: (this.props.andamento.id_notification % 2 == 0 ? '#fff' : '#ecebeb' )}]}>
            <Image style={styles.image} source={{uri: this.props.andamento.userPhoto}} />
            <View style={styles.boxText}>
                <Text style={styles.boxTextTitle}>{this.props.andamento.title}</Text>
                <Text style={styles.boxTextUser}>{this.props.andamento.user} ás {this.props.andamento.horario}</Text>
            </View>
        </View>
    )
  }
  
}


const styles = StyleSheet.create({
  boxNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },
  boxText: {
    marginLeft: 10
  },
  boxTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#494848'
  },
  boxTextUser: {
    fontSize: 12,
    color: '#909090'
  }
});
