import React from "react";
import { View } from "react-native";
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

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
import ReservationStatusScreen from "./app/Screen/ReservationStatusScreen"
import MatchingStatusScreen from "./app/Screen/MatchingStatusScreen"
import MyPageScreen from "./app/Screen/MyPageScreen"
import MainIndividualScreen from './app/Screen/MainIndividualScreen';
import MainTeamScreen from './app/Screen/MainTeamScreen';
import TeamInfoScreen from './app/Screen/TeamInfoScreen';
import TeamGameResultScreen from './app/Screen/TeamGameResultScreen';
import TeamMemberListScreen from './app/Screen/TeamMemberListScreen';
import TeamMemberDetailScreen from './app/Screen/TeamMemberDetailScreen';

export const StackNavigator = createStackNavigator({
	Home: {
		screen: createBottomTabNavigator({
			Individual: MainIndividualScreen,
			Team: MainTeamScreen
		},{
			tabBarOptions: {
				activeTintColor: '#e91e63',
				labelStyle: {
					fontSize: 12,
				}
			}
		}),
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
	},
	ReservationStatus: {
		screen : ReservationStatusScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	MatchingStatus: {
		screen : MatchingStatusScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	MyPage: {
		screen : MyPageScreen,
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	TeamInfo: {
		screen: createBottomTabNavigator({
			TeamInfo: TeamInfoScreen,
			GameResult: TeamGameResultScreen,
			MemberList: TeamMemberListScreen
		},
		{
			tabBarOptions: {
				activeTintColor: '#e91e63',
				labelStyle: {
					fontSize: 12,
				}
			}
		}),
		navigationOptions: ({ navigation }) => ({ header: null })
	},
	TeamMemberDetail: {
		screen : TeamMemberDetailScreen,
		navigationOptions: ({ navigation }) => ({ header: null })	
	}
}, {
	initialRouteName: 'Home',
});

export default createAppContainer(StackNavigator);