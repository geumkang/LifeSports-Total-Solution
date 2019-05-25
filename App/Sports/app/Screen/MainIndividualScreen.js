import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import * as Keychain from 'react-native-keychain';

import { Card, ListItem, Icon } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'
import Util from '../Component/Util'

export default class MainIndividualScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "개인 정보",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} type="font-awesome" color={tintColor} />
        )
    }

	constructor(props){
		super(props);
		this.state = {
			spinnerReserv: true,
			spinnerMatch: true,
			reservationList: [],
			matchingData: []
		}
	}
	

	// Get Login Info
	getData = async () => {
		try {
			try {
				// Retrieve the credentials
				const credentials = await Keychain.getGenericPassword();
				if (credentials) {
					console.log('Credentials successfully loaded for user ' + credentials.username);

					let data = {
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						method: 'POST',
						body: JSON.stringify({
							'ID' : credentials.username,
							'PWD' : credentials.password
						})
					}
	
					return fetch('http://' + global.appServerIp + '/user/login', data)
						.then((response) => response.json())
						.then((responseJson) => {
							global.UDID = responseJson[0].UDID;
							global.ID = responseJson[0].ID;
							global.name = responseJson[0].name;
							global.loginStatus = true;
						})
						.then(() => {
							this.getReservationList();
							this.getMatchingList();
						})
						.catch((error) => {
							console.error(error);
						});
					
				} else {
					console.log('No credentials stored');
				}
			} catch (error) {
				console.log('Keychain couldn\'t be accessed!', error);
			}
			
			
		} catch(e) {
			// error reading value
		}
	}

	componentDidMount(){
		this.setState({
			reservationList: [],
			matchingData: []
		});
		this.getData();
    }
    
	onPressReservationStatus = (item) => {
		// this.props.navigation.navigate("RatingGame");
		this.props.navigation.navigate("ReservationStatus", {'scheduleID': item.scheduleID});
	}

	onPressMatchingStatus = (item) => {
		this.props.navigation.navigate("MatchingStatus", {'scheduleID': item.scheduleID});
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>
				<ScrollView>
					<Card title="예약 현황">
						<ScrollView style={{width: '100%', height: 150}}>
						{
							this.state.spinnerReserv ? 
								<ActivityIndicator size="large" color={global.pointColor}/>
							:
							this.state.reservationList.map((item, i) => {
								return (
									<ListItem
										key={i}
										roundAvatar
										title={item.name}
										subtitle={item.time}
										topDivider
										bottomDivider
										badge={{value: item.dday, 
												badgeStyle: {width: 50, height: 20, backgroundColor: global.pointColor},
												textStyle: {color: global.fontPointColor, fontWeight: 'bold'}}}
										titleStyle={{color: "#000"}}
										onPress={()=>this.onPressReservationStatus(item)}
									/>
								);
							})
						}
						</ScrollView>
					</Card>

					<Card title="매칭 현황">
						<ScrollView style={{width: '100%', height: 150}}>
						{
							this.state.spinnerMatch ? 
								<ActivityIndicator size="large" color={global.pointColor}/>
							:
							this.state.matchingData.map((item, i) => {
								if(item.currentParticipant >= item.minParticipant)
									value = item.dday;
								else
									value = item.currentParticipant + "/" + item.maxParticipant;
								return (
									<ListItem
										key={i}
										roundAvatar
										title={item.name}
										subtitle={item.time}
										topDivider
										bottomDivider
										badge={{value: value,
												badgeStyle: {width: 60, height: 20, backgroundColor: global.pointColor},
												textStyle: {color: global.fontPointColor, fontWeight: 'bold'}}}
										titleStyle={{color: "#000"}}
										onPress={()=>this.onPressMatchingStatus(item)}
									/>
								);
							})
						}
						</ScrollView>
					</Card>
                </ScrollView>
				<View style={styles.menuView}>
					<TouchableOpacity
						style={[styles.selectMenu, {backgroundColor: global.pointColor}]}
						onPress={()=>{
							this.props.navigation.navigate("SelectType");
						}}>
						<View style={{flexDirection: 'row', justifyContent: 'center'}}>
							<Icon
								name='paper-plane'
								type='font-awesome'
								color="#000"
								size={18}
								iconStyle={styles.icon} />
							<Text style={styles.item}>예약하기</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>  
		);
	}

	getReservationList = () => {
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
        return fetch('http://' + global.appServerIp + '/schedule/reservationstatus', data)
            .then((response) => response.json())
            .then((responseJson) => {
                let list = [];
                for(let i = 0; i < responseJson.length; i++){
                    list.push({
                        gym_ID: responseJson[i].gym_ID,
                        name: responseJson[i].gym_name,
						address: responseJson[i].gym_location,
						time: Util.ISOToDate(responseJson[i].starttime) + " " + Util.dateToTime(responseJson[i].starttime),
						dday: "D" + responseJson[i].dday,
						scheduleID: responseJson[i].schedule_ID
                    });
                }

                this.setState({
					reservationList : list,
					spinnerReserv: false
                });
                console.log('Reservation Status : ', list);
            })
            .catch((error) => {
				console.error(error);
            });
	}
	
	getMatchingList = () => {
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
        return fetch('http://' + global.appServerIp + '/schedule/matchingstatus', data)
            .then((response) => response.json())
            .then((responseJson) => {
                let list = [];
                for(let i = 0; i < responseJson.length; i++){
                    list.push({
                        gym_ID: responseJson[i].gym_ID,
                        name: responseJson[i].gym_name,
						address: responseJson[i].gym_location,
						time: Util.ISOToDate(responseJson[i].starttime) + " " + Util.dateToTime(responseJson[i].starttime),
						dday: "D" + responseJson[i].dday,
						currentParticipant: responseJson[i].cur_participant,
						maxParticipant: responseJson[i].max_participant,
						minParticipant:responseJson[i].min_participant,
						scheduleID: responseJson[i].schedule_ID
                    });
                }

                this.setState({
					reservationList : list,
					spinnerMatch: false
                });
				console.log('Matching Status : ', list);
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
		marginTop: 7,
		marginRight: 15
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});