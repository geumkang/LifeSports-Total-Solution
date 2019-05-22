import React, {Component} from 'react';
import { View, Text } from "react-native";

export class MemberDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        let data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'UDID' : this.props.UDID
            })
        }

        return fetch('http://' + global.appServerIp + '/user/userinfo', data)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ID: responseJson[0].ID,
                    name: responseJson[0].name,
                    gender: responseJson[0].gender,
                    birth: new Date(responseJson[0].birth),
                })                    
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        
        return(
            <View style={{flex: 1}}>
                <Text>{this.state.name}</Text>
            </View>
        );
    }
}   