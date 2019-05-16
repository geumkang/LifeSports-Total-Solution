import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import { Card, ListItem, Icon, Button, Image } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'

export default class MainTeamScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "팀 정보",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="users" size={25} type="font-awesome" color={tintColor} />
        )
    }

    constructor(props){
		super(props);
		this.state ={
			reservationData: [],
			matchingData: []
		}
	}
	
	componentDidMount(){
		global.loginStatus = false;
		this.setState({
			reservationData: [
				{
					name: '국사봉 체육관'
				},
				{
					name: '중앙대 체육관'
				}
			],

			matchingData: [
				{
					name: '국사봉 체육관'
				},
				{
					name: '중앙대 체육관'
				}
			]
		});
    }
    
	onPressReservationStatus = () => {
		this.props.navigation.navigate("ReservationStatus");
	}

	onPressMatchingStatus = () => {
		this.props.navigation.navigate("MatchingStatus");
    }
    
    onPressJoinBtn = () => {
        this.props.navigation.navigate("TeamInfo", {'Team': "팀 정보 넘기기", "headerTitle": "팀원 목록"});
    }

	render() {
		return (
			<View style={{flex: 1}}>
				<HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>

                {global.hasTeam ? (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <Card title="매칭 현황">
                            {
                                this.state.matchingData.map((u, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            roundAvatar
                                            title={u.name}
                                            chevron
                                            topDivider
                                            bottomDivider
                                            badge={{value: "10 / 20", 
                                                    badgeStyle: {width: 60, height: 20, backgroundColor: "#f40057"},
                                                    textStyle: {color: 'white', fontWeight: 'bold'}}}
                                            onPress={()=>this.onPressMatchingStatus()}
                                        />
                                    );
                                })
                            }
                            </Card>
                        </ScrollView>
                        <View style={styles.menuView}>
                            <TouchableOpacity
                                style={styles.selectMenu}
                                onPress={()=>{
                                    this.props.navigation.navigate("SelectType");
                                }}>
                                <Text style={styles.item}>예약하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (        
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <Card
                                title='삼성 디스플레이'
                                image={require('../Images/team1.jpg')}
                                >
                                <Text style={{marginBottom: 10}}>
                                    대한민국 엘리트 멤버들이 모였다. 축구는 머리로 하는 것이다!
                                </Text>
                                <Button
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='가입하기'
                                    onPress={this.onPressJoinBtn}/>
                            </Card>

                            <Card
                                title='한화 건설 동호회'
                                image={require('../Images/team2.jpg')}
                                >
                                <Text style={{marginBottom: 10}}>
                                    현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!
                                </Text>
                                <Button
                                    backgroundColor='#03A9F4'
                                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='가입하기'
                                    onPress={this.onPressJoinBtn}/>
                            </Card>
                        </ScrollView>
                    </View>
                )}
			</View>  
		);
	}
}


const styles = StyleSheet.create({
	menuView: {
		flex: 1,
		flexDirection: 'row'
	},
	selectMenu: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 15,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
		borderRadius: 15,
        justifyContent: 'center'
	},
	item: {
        fontSize: 30,
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
    }
});