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

        if(global.hasTeam){
            this.setState({
                MyTeamInfo: {
                    name: '축구왕 통키'
                }
            })
        }
    }
    
	onPressReservationStatus = () => {
		this.props.navigation.navigate("ReservationStatus");
	}

	onPressMatchingStatus = () => {
		this.props.navigation.navigate("MatchingStatus");
    }
    
    onPressJoinBtn = () => {
        this.props.navigation.navigate("TeamInfo", {'MyTeamInfo': this.state.MyTeamInfo, "headerTitle": "팀원 목록"});
    }

	render() {
		return (
			<View style={{flex: 1, backgroundColor: global.backgroundColor}}>
				<HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>

                {global.hasTeam ? (
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <Card
                                title='축구왕 통키'
                                image={require('../Images/team1.jpg')}
                                >
                                <Text style={{marginBottom: 10, color: "#000"}}>
                                    대한민국 엘리트 멤버들이 모였다. 축구는 머리로 하는 것이다!
                                </Text>
                                <Button
                                    buttonStyle={{backgroundColor: global.pointColor}}
                                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                                    title='가입하기'
                                    onPress={this.onPressJoinBtn}/>
                            </Card>

                            <Card
                                title='한화 건설 축구 동호회'
                                image={require('../Images/team2.jpg')}
                                >
                                <Text style={{marginBottom: 10, color: "#000"}}>
                                    현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!
                                </Text>
                                <Button
                                    buttonStyle={{backgroundColor: global.pointColor}}
                                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                                    title='가입하기'
                                    onPress={this.onPressJoinBtn}/>
                            </Card>
                        </ScrollView>
                    </View>
                ) : (        
                    <View style={{flex: 1}}>
                        <ScrollView>
                            <Card
                                title='삼성 디스플레이'
                                image={require('../Images/team1.jpg')}
                                >
                                <Text style={{marginBottom: 10, color: "#000"}}>
                                    대한민국 엘리트 멤버들이 모였다. 축구는 머리로 하는 것이다!
                                </Text>
                                <Button
                                    buttonStyle={{backgroundColor: global.pointColor}}
                                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                                    // buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                    title='가입하기'
                                    onPress={this.onPressJoinBtn}/>
                            </Card>

                            <Card
                                title='한화 건설 동호회'
                                image={require('../Images/team2.jpg')}
                                >
                                <Text style={{marginBottom: 10, color: "#000"}}>
                                    현장 노동자들의 장딴지 근육을 보았는가. 우린 잔디 구장보다 모래 바닥이 더 익숙하다!
                                </Text>
                                <Button
                                    buttonStyle={{backgroundColor: global.pointColor}}
                                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
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