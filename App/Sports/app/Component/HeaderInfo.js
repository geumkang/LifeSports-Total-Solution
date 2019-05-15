import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header, Avatar, Icon } from 'react-native-elements'

export class HeaderInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isMain: false
        }
    }

    componentDidMount(){
        if(this.props.headerTitle == "메인"){
            this.setState({isMain: true});
        }
    }

    render(){
        return(
            <View>
                {this.state.isMain ? (
                    <Header
                        innerContainerStyles={{flexDirection: 'row'}}
                        backgroundColor='#f40057'
                        leftComponent={<Avatar
                                            small
                                            rounded
                                            source={{uri: "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/2016/07/mrrobot_s2_cast_rami-malek2.jpg"}}
                                            containerStyle={{marginLeft: 10}}
                                            onPress={() => this.props.navigation.navigate("Login")}
                                            activeOpacity={0.7}
                                        />}
                        centerComponent={ <View style={{alignItems: 'center'}}>
                                            <Text style={styles.title}>{this.props.headerTitle}</Text>
                                            </View>}
                        // rightComponent={<Icon name='ios-arrow-round-back' 
                        //                     size={40} 
                        //                     type='ionicon' 
                        //                     color={'#fff'} 
                        //                     iconStyle={{marginRight: 10}}
                        //                     underlayColor={'#f40057'}
                        //                     onPress={() => this.props.navigation.goBack()}/>}
                    />
                ) : (
                    <Header
                        innerContainerStyles={{flexDirection: 'row'}}
                        backgroundColor='#f40057'
                        leftComponent={<Avatar
                                            small
                                            rounded
                                            source={{uri: "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/2016/07/mrrobot_s2_cast_rami-malek2.jpg"}}
                                            containerStyle={{marginLeft: 10}}
                                            onPress={() => this.props.navigation.navigate("Login")}
                                            activeOpacity={0.7}
                                        />}
                        centerComponent={ <View style={{alignItems: 'center'}}>
                                            <Text style={styles.title}>{this.props.headerTitle}</Text>
                                            </View>}
                        rightComponent={<Icon name='ios-arrow-round-back' 
                                            size={40} 
                                            type='ionicon' 
                                            color={'#fff'} 
                                            iconStyle={{marginRight: 10}}
                                            underlayColor={'#f40057'}
                                            onPress={() => this.props.navigation.goBack()}/>}
                    />
                )}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        justifyContent: 'center',
        color: '#fff',
        alignContent:'center',
        textAlignVertical: 'center',
        fontSize: 20
    }
});

