import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
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
                        containerStyle={{marginTop: Platform.OS === 'ios' ? 0 : - 20}}
                        innerContainerStyles={{flexDirection: 'row'}}
                        backgroundColor='#f40057'
                        leftComponent={<Icon
                                            name="user-circle"
                                            type='font-awesome'
                                            size={30}
                                            color='white'
                                            containerStyle={{marginLeft: 10}}
                                            underlayColor={"#f40057"}
                                            onPress={() => this.props.navigation.navigate("Login")}
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
                        containerStyle={{marginTop: Platform.OS === 'ios' ? 0 : - 20}}
                        innerContainerStyles={{flexDirection: 'row'}}
                        backgroundColor='#f40057'
                        leftComponent={<Icon
                                            name="user-circle"
                                            type='font-awesome'
                                            size={30}
                                            color='white'
                                            containerStyle={{marginLeft: 10}}
                                            underlayColor={"#f40057"}
                                            onPress={() => this.props.navigation.navigate("Login")}
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

