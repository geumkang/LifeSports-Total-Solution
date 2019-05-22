import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {HeaderInfo} from '../Component/HeaderInfo'

export default class SelectTypeScreen extends Component {
    constructor(props) {
        super(props);
        state = {
        }
    }

    componentDidMount(){
        const state = this.props.navigation.getParam("state");
        this.setState(state)
    }
    

    updateText = (key, text) => {
        this.setState({[key]: text})
    }

    render() {
		return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="회원 가입" navigation={this.props.navigation}></HeaderInfo>
                
                <View style={styles.container}>
                    <InputComponent
                        iconName="user"
                        label="ID"
                        placeholder=""
                        stateKey="name"
                        updateText={this.updateText}
                    ></InputComponent>

                    <InputComponent
                        iconName="unlock-alt"
                        label="Password"
                        placeholder=""
                        stateKey="password"
                        updateText={this.updateText}
                    ></InputComponent>

                    <InputComponent
                        iconName="envelope"
                        label="E-mail"
                        placeholder=""
                        stateKey="email"
                        updateText={this.updateText}
                    ></InputComponent>

                    <Button
                        title="회원 가입"
                        buttonStyle={{backgroundColor: global.pointColor}}
                        titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                        onPress={this.onPressNextStep}/>
                </View>
            </View>
        );
    }

    
}

function InputComponent(props) {
    const key = props.stateKey;
    return(
        <View style={styles.inputContainer}>
            <Input style={styles.inputs}
                leftIcon={
                    <Icon
                        name={props.iconName}
                        size={24}
                        color={global.backgroundColor4}
                    />
                }
                leftIconContainerStyle={{marginRight: 20}}
                label={props.label}
                placeholder={props.placeholder}
                //keyboardType="email-address"
                onChangeText={(text) => props.updateText(key, text)}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width:350,
        height:100,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    }
});