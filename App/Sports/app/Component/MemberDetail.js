import React, {Component} from 'react';
import { View, Text } from "react-native";

export class MemberDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const player = this.props.player;

        return(
            <View style={{flex: 1}}>
                <Text>{player.name}</Text>
            </View>
        );
    }
}   