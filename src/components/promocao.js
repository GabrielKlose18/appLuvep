import React, {Component} from 'react';
import { 
    StyleSheet, 
    Image, 
    View
} from 'react-native';


export default class Promocao extends Component{
  render() {
    return (
        <View style={styles.container}>    
            <Image 
                source={{uri: this.props.promocao.ds_promocao_foto}}
                resizeMode= 'contain'   
                style={styles.img}                 
            />
        </View>
      
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    // backgroundColor: '#ececec'
  },
  img: {
    borderRadius: 10,
    height: 200,
    width: 330,
    // backgroundColor: 'blue'
  }
});
