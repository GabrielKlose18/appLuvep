import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    StyleSheet, 
    Text, 
    View
} from 'react-native';

import { VictoryPie } from "victory-native";
import { Svg, Text as SvgText } from 'react-native-svg';


export default class BoxServico extends Component{
  state = {
    percents: this.props.agendamento.procentagem_servico,
  };
  getChartData = () => [
    { x: 1, y: this.state.percents },
    { x: 2, y: 100 - this.state.percents },
  ];

  onChartFill = (data) => {
    const themeColor = '#d95c30';
    return data.x === 1 ? themeColor : 'transparent';
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: '50%'}}>
          <View style={styles.containerPlaca}>
            <Text style={styles.placa}>{this.props.agendamento.ds_agendamento_placa}</Text>
          </View>
          <View style={styles.chartContainer}>
            <Svg width={125} height={150}>
              <VictoryPie
                // strokeWidth={}
                labels={[]}
                padding={0}
                standalone={false}
                width={120}
                height={145}
                style={{ data: { fill: this.onChartFill, stroke : this.onChartFill } }}
                data={this.getChartData()}
                cornerRadius={15}
                innerRadius={40}
              />
              <SvgText
                textAnchor="middle"
                verticalAnchor="middle"
                x={60}
                y={78}
                fontWeight={'bold'}
                height={25}
                fontSize={25}
                // fontFamily={''}
                >
                {`${this.state.percents}%`}
              </SvgText>
            </Svg>
          </View>
        </View>
        <View style={{alignItems: 'flex-end',width: '50%'}}>
            <View >
              <Text style={styles.textBoxTitle}>ETAPA</Text>
              <Text style={styles.textBoxConteudo}>{this.props.agendamento.ds_etapa}</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textBoxTitle}>BOX</Text>
              <Text style={styles.textBoxConteudo}>{this.props.agendamento.ds_box}</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textBoxTitle}>Consultor</Text>
              <Text style={styles.textBoxConteudo}>{this.props.agendamento.nm_usuas}</Text>
            </View>
        </View>
      </View>
    )
  }
  
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    padding: 18,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f1ecec'
  },
  containerPlaca: {
    flexDirection: 'row',
  },
  chartContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 10,
    // padding: 5,
    // backgroundColor: 'brown',
  },
  placa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#616161',
    textAlign: 'center',
    // fontFamily: 'Helvetica Neue'
  },
  box: {
    marginTop: 30
  },
  textBoxTitle: {
    textAlign: 'right',
    fontSize: 14,
    color: '#616161',
    fontWeight: 'bold',
  },
  textBoxConteudo: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 2,
    color: '#8b8b8b'
  }
});
