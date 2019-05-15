import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SelectTypeScreen from "./app/Screen/SelectTypeScreen"
import SelectSportsScreen from "./app/Screen/SelectSportsScreen"
import SelectRegionScreen from "./app/Screen/SelectRegionScreen"
import SelectPlanScreen from "./app/Screen/SelectPlanScreen"
import ReservationCheckScreen from "./app/Screen/ReservationCheckScreen"
import JoinPlayerListScreen from "./app/Screen/JoinPlayerListScreen"
import JoinPlayerDetailScreen from "./app/Screen/JoinPlayerDetailScreen"
import FavoriteGymListScreen from "./app/Screen/FavoriteGymListScreen"
import LoginScreen from "./app/Screen/LoginScreen"
import RegisterScreen from "./app/Screen/RegisterScreen"
import RegisterScreen2 from "./app/Screen/RegisterScreen2"

import {HeaderInfo} from './app/Component/HeaderInfo';

class HomeScreen extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			dataSource: ''
		}
	}
	
	// componentDidMount(){
	// 	let data = {
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 		  	test: 'admin'
	// 		})
	// 	}
	// 	console.log("시자가아아아악!!!")
	// 	return fetch('http://3.16.229.70:8080/reactMapRequest.do', data)
	// 			.then((response) => response.json())
	// 			.then((responseJson) => {
	// 				console.log("lalallaa");
	// 				console.log(responseJson);
	// 				this.setState({
	// 					dataSource: responseJson,
	// 				}, function(){

	// 				});
	// 			})
	// 			.catch((error) =>{
	// 				console.error(error);
	// 			});
	// }

  	render() {		
		const statusList = ['Step1', 'Step2', 'Step3', 'Step4'];
		const step = 0;
		return (
			<View style={{flex: 1}}>
				<HeaderInfo headerTitle="메인" navigation={this.props.navigation}></HeaderInfo>
				<View style={{flex: 5}}></View>
				<View style={styles.menuView}>
					<TouchableOpacity
						style={styles.selectMenu}
						onPress={()=>{
							this.props.navigation.navigate("SelectType");
						}}>
						<Text style={styles.item}>예약하기</Text>
					</TouchableOpacity>
				
				{/* 
					<TouchableOpacity
						style={styles.selectMenu}
						onPress={()=>{
							this.props.navigation.navigate("FavoriteGymList",  {"statusList": statusList, "step": Number(step)});
						}}>
						<Text style={styles.item}>즐겨찾기</Text>
					</TouchableOpacity> */}
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



const AppNavigator = createStackNavigator({
	Home: {
		screen : HomeScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	SelectType: {
		screen : SelectTypeScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	SelectSports: {
		screen : SelectSportsScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	SelectRegion: {
		screen : SelectRegionScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	SelectPlan: {
		screen : SelectPlanScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	ReservationCheck: {
		screen : ReservationCheckScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	JoinPlayerList: {
		screen : JoinPlayerListScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	JoinPlayerDetail: {
		screen : JoinPlayerDetailScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	FavoriteGymList: {
		screen : FavoriteGymListScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	Login: {
		screen : LoginScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	Register: {
		screen : RegisterScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	Register2: {
		screen : RegisterScreen2,
		navigationOptions: ({ navigation }) => ({ header: null })
	}
});

export default createAppContainer(AppNavigator);