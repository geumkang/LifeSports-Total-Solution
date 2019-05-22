import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Card } from 'react-native-elements'

import {HeaderInfo} from '../Component/HeaderInfo'

export default class FavoriteGymListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            fevoriteGymList: [
                {
                    key: '1',
                    name: '국사봉 체육관',
                    address: '동작구 상도동 123-12'
                },
                {
                    key: '2',
                    name: '중앙대 체육관',
                    address: '동작구 상도동 123-123'
                }
            ]
        }
    }

    onEndReached = () => {
        this.setState(state => ({
            data: [
                ...state.data,
            ]
        }));
    };

    onRefresh = () => {
        this.setState({
            data: {
                key: '1',
                name: '국사봉 체육관2',
                address: '동작구 상도동 123-12'
            }
        });
    }

    nextPage = (gym) => {
        const statusList = this.props.navigation.getParam("statusList");
        const step = this.props.navigation.getParam("step");
        statusList[step] = gym.name;
        this.props.navigation.navigate("SelectPlan", {"statusList": statusList, "step": Number(step)+1});
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="즐겨찾기" navigation={this.props.navigation}></HeaderInfo>
                <View style={{flex: 1}}>
                {
                    this.state.fevoriteGymList.map((gym, i) => (
                        <Card
                            containerStyle={{padding: 0}}>
                            <ListItem
                                key={i}
                                roundAvatar
                                title={gym.name}
                                subtitle={gym.address}
                                chevron
                                titleStyle={{color: "#000", fontWeight: 'bold', marginBottom: 5}}
                                subtitleStyle={{color: "#000"}}
                                onPress={()=>this.nextPage(gym)}
                            />
                        </Card>
                    ))
                }
                </View>
            </View>
        );
    }
}