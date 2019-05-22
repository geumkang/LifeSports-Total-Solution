import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
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
        this.setState({
            id: '',
            name: '',
            password: '',
            email: '',
            duplicate: false
        })
    }

    updateText = (key, text) => {
        this.setState({[key]: text})
    }

    onPressNextStep = () => {
        this.props.navigation.navigate("Register2", {state: this.state});
    }

    checkIdDuplicate = () => {
        if(this.state.id == ''){
            Alert.alert('ERROR', 'ID를 입력해주세요');
            return;
        }
        
        let data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'ID' : this.state.id
            })
        }

        return fetch('http://' + global.appServerIp + '/user/checkdup', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if(responseJson[0]){
                    Alert.alert('OK', '사용 가능한 ID입니다.');
                    this.setState({duplicate: responseJson[0]})
                }
                else{
                    Alert.alert('ERROR', '사용 불가능한 ID입니다.');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    
    render() {
		return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="회원 가입" navigation={this.props.navigation}></HeaderInfo>
                
                <ScrollView 
                    keyboardDismissMode='on-drag'
                    contentContainerStyle={styles.container}>
                    
                    <View style={{flexDirection: 'row'}}>
                        <InputComponent
                            iconName="user"
                            label="ID"
                            placeholder=""
                            stateKey="id"
                            updateText={this.updateText}
                            style={{width: 250}}
                        ></InputComponent>
                        <View style={{height: '100%', paddingTop: 40}}>
                            <Button
                                title="중복 체크"
                                buttonStyle={{backgroundColor: global.pointColor, borderRadius: 50, width: 100}}
                                titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                                onPress={this.checkIdDuplicate}/>
                        </View>
                    </View>

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
                        stateKey="name"
                        updateText={this.updateText}
                    ></InputComponent>

                    <InputComponent
                        iconName="envelope"
                        label="E-mail"
                        placeholder=""
                        stateKey="email"
                        updateText={this.updateText}
                    ></InputComponent>
                </ScrollView>
                <Button
                    title="Next Step"
                    buttonStyle={{backgroundColor: global.pointColor}}
                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                    onPress={this.onPressNextStep}/>
            </View>
        );
    }    
}

function InputComponent(props) {
    const key = props.stateKey;
    return(
        <View style={[styles.inputContainer, props.style]}>
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