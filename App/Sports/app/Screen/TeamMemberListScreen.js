import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { Icon } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'
import {MemberList} from '../Component/MemberList'

export default class TeamMemberListScreen extends Component{
    static navigationOptions = {
        tabBarLabel: "팀원 정보",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={25} type="font-awesome" color={tintColor} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            playerList: [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                }
            ]
        }
    }

    componentDidMount(){
        this.setState({headerTitle: this.props.navigation.getParam("headerTitle")});
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle={this.state.headerTitle} navigation={this.props.navigation}></HeaderInfo>

                <MemberList
                    playerList={this.state.playerList}
                    navigation={this.props.navigation}
                    DetailScreen="TeamMemberDetail"
                ></MemberList>
            </View>
        );
    }
}