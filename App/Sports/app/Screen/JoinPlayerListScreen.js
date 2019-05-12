import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { ListItem } from 'react-native-elements'

import {HeaderInfo} from '../Component/HeaderInfo'

export default class JoinPlayerList extends Component{
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
    
    viewPlayerDetail = (player) => {
        this.props.navigation.navigate("JoinPlayerDetail", {"player": player});
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="참여자 목록" navigation={this.props.navigation}></HeaderInfo>
                <View style={{flex: 1}}>
                    {
                        this.state.playerList.map((player, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: player.avatar_url } }}
                            title={player.name}
                            subtitle={player.subtitle}
                            chevron
                            onPress={()=>this.viewPlayerDetail(player)}
                        />
                        ))
                    }
                </View>
            </View>
        );
    }
}