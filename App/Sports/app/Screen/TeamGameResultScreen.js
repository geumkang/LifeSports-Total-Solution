import React, {Component} from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { Image, Icon } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'

export default class TeamGameResultScreen extends Component{
    static navigationOptions = {
        tabBarLabel: "경기 전적",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={25} type="font-awesome" color={tintColor} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="경기 전적" navigation={this.props.navigation}></HeaderInfo>
                <Image source={require('../Images/team2.jpg')}
                        style={{ width: '100%', height: 200 }}/>
                <Text style={{marginBottom: 10}}>
                    현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!
                </Text>
            </View>
        );
    }
}