import React, {Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { 
    StyleSheet, 
    Text, 
    View,
    ImageBackground,
    ActivityIndicator,
    TouchableHighlight,
} from 'react-native';

import renderIf from './renderIf'

export default class Anuncio extends Component{

    constructor(){
        super();
        this.state = {
            status:true
        }
    }
    removeAnuncio(){
        this.setState({
          status:!this.state.status
        });
    }
    render() {
        return (
            <View>
                {renderIf(this.state.status)(
                    <ImageBackground 
                        source={require('../images/anuncio.jpg')} 
                        style={[styles.boxNotification]}
                        imageStyle={{ borderRadius: 10 }}    
                        resizeMode= 'contain'
                    >
                    <TouchableHighlight onPress={()=>this.removeAnuncio()}>
                        <AntDesign
                        style={{marginRight: -7,marginTop: -2,}}
                        name="closecircle"
                        size={17}
                        color={'rgb(102,102,102)'}  
                        />
                    </TouchableHighlight>
                    </ImageBackground>
                )}

                
            </View>
        )
    }
  
}


const styles = StyleSheet.create({
  boxNotification: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    // borderRadius: 30,
    // backgroundColor: 'gray'
  }
});
