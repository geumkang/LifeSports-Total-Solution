import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import { Card, ListItem, Icon, Button, Image } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'
import {ImageCard} from '../Component/ImageCard'

export default class MainMyTeamScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "팀 정보",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={25} type="font-awesome" color={tintColor} />
        )
    }

    constructor(props){
		super(props);
		this.state ={
			MyTeamInfo: []
		}
	}
	
	componentDidMount(){
        this.setState({
			MyTeamInfo: []
        });

        this.teamInfoRequest();
    }
    
	onPressTeam = (item) => {
        this.props.navigation.navigate("TeamInfo", {'MyTeamInfo': item, "headerTitle": "팀원 목록"});
    }

    renderTeam(type) {
        return this.state.MyTeamInfo.map((item) => {
            if(item.side == type){
                return (
                    <ImageCard
                        imagePath={require('../Images/team1.jpg')}
                        title={item.name}
                        detail='대한민국 엘리트 멤버들이 모였다. 축구는 머리로 하는 것이다!'
                        btnTitle='들어가기'
                        onPressBtn={()=>this.onPressTeam(item)}
                        twoSide
                    ></ImageCard>
                );
            }
        });
    }
    
    render() {
		return (
			<View style={{flex: 1, backgroundColor: global.backgroundColor}}>
				<HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>
                <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            {this.renderTeam(0)}
                        </View>
                        
                        <View style={{flex: 1}}>
                            {this.renderTeam(1)}
                            {/* <ImageCard
                                imagePath={require('../Images/team2.jpg')}
                                title='한화 건설 축구 동호회'
                                detail='현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!'
                                btnTitle='들어가기'
                                onPressBtn={this.onPressTeam}
                                twoSide
                                right
                            ></ImageCard>

                            <ImageCard
                                imagePath={require('../Images/team2.jpg')}
                                title='한화 건설 축구 동호회'
                                detail='현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!'
                                btnTitle='들어가기'
                                onPressBtn={this.onPressTeam}
                                twoSide
                                right
                            ></ImageCard> */}
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.menuView}>
                    <TouchableOpacity
                        style={[styles.selectMenu, {backgroundColor: global.pointColor}]}
                        onPress={()=>{
                            this.props.navigation.navigate("RegisterTeam");
                        }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Icon
                                name='plus'
                                type='font-awesome'
                                color="#000"
                                size={22}
                                iconStyle={styles.icon} />
                            <Text style={styles.item}>팀 등록</Text>
                        </View>
                    </TouchableOpacity>
                </View>
			</View>  
		);
    }
    
    teamInfoRequest = () => {
        let data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'UDID' : global.UDID
            })
        }
        let MyTeamInfo = []
        return fetch('http://' + global.appServerIp + '/user/hasteam', data)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length > 0){
                    global.hasTeam = true;
                    this.setState({teamCount : responseJson.length});
                }

                for(var i = 0; i < responseJson.length; i++){
                    side = i % 2

                    MyTeamInfo.push({
                        ID: 1,
                        name: responseJson[i].team_name,
                        MMR: responseJson[i].team_MMR,
                        winRate: responseJson[i].winning_rate,
                        isLeader: responseJson[i].isleader,
                        side: side
                    });
                }
                this.setState({
                    MyTeamInfo: MyTeamInfo
                })

                console.log('MyTeamInfo: ', responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

const styles = StyleSheet.create({
	menuView: {
		width: '100%',
		height: 80,
		justifyContent: 'center',
		flexDirection: 'row'
    },
    selectMenu: {
        flex: 0.5,
        marginTop: 15,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
		borderRadius: 50,
        justifyContent: 'center'
	},
    item: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
		color: "#000"
    },
	title: {
        justifyContent: 'center',
        color: '#fff',
        alignContent:'center',
        textAlignVertical: 'center',
        fontSize: 20
	},
	icon: {
		marginTop: 6,
		marginRight: 15
	}
});
	