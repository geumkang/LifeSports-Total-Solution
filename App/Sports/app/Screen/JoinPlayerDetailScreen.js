import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

import {HeaderInfo} from '../Component/HeaderInfo'

export default class JoinPlayerList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const player = this.props.navigation.getParam("player");

        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle={player.name}></HeaderInfo>
                
            </View>
        );
    }
}