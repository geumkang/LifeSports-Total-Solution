import React, {Component} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
            name: '',
            password: '',
            email: ''
        })
    }

    updateText = (key, text) => {
        this.setState({[key]: text})
    }

    onPressNextStep = () => {
        this.props.navigation.navigate("Register2", {state: this.state});
    }

    render() {
		return (
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="회원 가입" navigation={this.props.navigation}></HeaderInfo>
                
                <ScrollView 
                    keyboardDismissMode='on-drag'
                    contentContainerStyle={styles.container}>

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
                    onPress={this.onPressNextStep}
                />
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
                        color='black'
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
        alignItems: 'center',
        backgroundColor: '#DCDCDC'
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