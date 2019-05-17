import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
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
	
	componentDidMount(){
        global.loginStatus = false;
        global.hasTeam = true;
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

	render() {
		return (
			<View style={{flex: 1}}>
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
									chevron
									topDivider
									bottomDivider
									badge={{value: "D-3", 
											badgeStyle: {width: 50, height: 20, backgroundColor: "#f40057"},
											textStyle: {color: 'white', fontWeight: 'bold'}}}
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
        marginBottom: 10,
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