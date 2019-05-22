import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import * as Keychain from 'react-native-keychain';

import { Card, ListItem, Icon } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'


export default class MainIndividualScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: "개인 정보",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} type="font-awesome" color={tintColor} />
        )
    }

	constructor(props){
		super(props);
		this.state ={
			reservationData: [],
			matchingData: []
		}
	}
	

	
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
		
		
		this.getData();
    }
    
	onPressReservationStatus = () => {
		this.props.navigation.navigate("ReservationStatus");
	}

	onPressMatchingStatus = () => {
		this.props.navigation.navigate("MatchingStatus");
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>
				<ScrollView>
					<Card title="예약 현황">
					{
						this.state.reservationData.map((u, i) => {
							return (
								<ListItem
									key={i}
									roundAvatar
									title={u.name}
									topDivider
									bottomDivider
									badge={{value: "D-3", 
											badgeStyle: {width: 50, height: 20, backgroundColor: global.pointColor},
											textStyle: {color: global.fontPointColor, fontWeight: 'bold'}}}
									titleStyle={{color: "#000"}}
                            		onPress={()=>this.onPressReservationStatus()}
								/>
							);
						})
					}
					</Card>

					<Card title="매칭 현황">
					{
						this.state.matchingData.map((u, i) => {
							return (
								<ListItem
									key={i}
									roundAvatar
									title={u.name}
									topDivider
									bottomDivider
									badge={{value: "10 / 20", 
											badgeStyle: {width: 60, height: 20, backgroundColor: global.pointColor},
											textStyle: {color: global.fontPointColor, fontWeight: 'bold'}}}
									titleStyle={{color: "#000"}}
                            		onPress={()=>this.onPressMatchingStatus()}
								/>
							);
						})
					}
					</Card>
                </ScrollView>
				<View style={styles.menuView}>
					<TouchableOpacity
						style={[styles.selectMenu, {backgroundColor: global.pointColor}]}
						onPress={()=>{
							this.props.navigation.navigate("SelectType");
						}}>
						<Text style={styles.item}>예약하기</Text>
					</TouchableOpacity>
				</View>
			</View>  
		);
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
    }
});