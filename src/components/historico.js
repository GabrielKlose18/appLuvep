import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Stars from 'react-native-stars';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class Historico extends Component{
  constructor(props){ 
    super(props) 
  }
  handleAvalia = (item) => {
    this.props.navigation.navigate('Avaliacao', item);
  };
  render() {
    return (
        <View style={[styles.boxNotification,{backgroundColor: (this.props.historico.cont % 2 == 0 ? '#fff' : '#ecebeb' )}]}>
            <View style={styles.boxNotificationData}>
              <Text style={styles.boxTextTitle}>{this.props.historico.dt_agendamento_dia}</Text>
              <Text style={styles.boxTextData}>{this.props.historico.dt_agendamento_mes}</Text>
            </View>
            <View style={styles.boxText}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.boxTextTitle}>{this.props.historico.ds_agendamento_placa}</Text>
                  { (this.props.historico.avaliado && this.props.historico.qt_avaliacao_estrela != "")  &&
                    <View style={{marginLeft: 10}}>
                      <Stars
                        disabled={true}
                        default={this.props.historico.qt_avaliacao_estrela}
                        spacing={3}
                        count={5}
                        backingColor='cornsilk'
                        fullStar={
                            <Ionicons
                                name="ios-star"
                                size={15} 
                                color={'#ffcc66'}  
                            />
                        }
                        emptyStar={
                            <Ionicons
                                name="ios-star-outline"
                                size={15} 
                                color={'#ffcc66'}  
                            />
                        }
                      />
                    </View>
                  }
                  <TouchableOpacity onPress={() => this.handleAvalia(this.props.historico) }>
                    { !this.props.historico.avaliado  && <Text style={styles.boxTextAvaliar}>Avaliar</Text>}
                  </TouchableOpacity>
                </View>
                <Text style={styles.boxTextData}>Entrada {this.props.historico.dt_agendamento_entrada}h</Text>
                <Text style={styles.boxTextData}>Saída {this.props.historico.dt_agendamento_saida}h</Text>
                {/* <Text style={styles.boxTextAvaliar}>Avaliar</Text> */}
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
    paddingVertical: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#d2d4d8',
  },
  boxNotificationData: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    height: 45,
    width: 45,
  },
  boxText: {
    marginLeft: 20
  },
  boxTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#494848'
  },
  boxTextData: {
    marginTop: 3,
    fontSize: 12,
    color: '#909090'
  },
  boxTextAvaliar: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#19286f'
  }
});
