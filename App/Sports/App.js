import React from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SelectSportsScreen from "./app/Screen/SelectSportsScreen"
import SelectRegionScreen from "./app/Screen/SelectRegionScreen"
import SelectPlanScreen from "./app/Screen/SelectPlanScreen"
import ReservationCheckScreen from "./app/Screen/ReservationCheckScreen"
import JoinPlayerListScreen from "./app/Screen/JoinPlayerListScreen"
import JoinPlayerDetailScreen from "./app/Screen/JoinPlayerDetailScreen"

import {HeaderInfo} from './app/Component/HeaderInfo';
import {SelectMenu} from './app/Component/SelectMenu';

class HomeScreen extends React.Component {
  	render() {
		const list = [
			{
				name: '예약',
				bgColor: "#00f"
			},
			{
				name: '매칭',
				bgColor: "#0f0"
			}
		]

		const statusList = ['Step1', 'Step2', 'Step3', 'Step4'];
		const step = 0;
		return (
			<View style={{flex: 1}}>
				<HeaderInfo headerTitle="메인"></HeaderInfo>
				<SelectMenu 
					menuList={list}
					nextPage="SelectSports"
					navigation={this.props.navigation}
					statusList={statusList}
					step={step}/>
			</View>  
		);
	}
}

const AppNavigator = createStackNavigator({
	Home: {
		screen : HomeScreen,
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
	}
});

export default createAppContainer(AppNavigator);