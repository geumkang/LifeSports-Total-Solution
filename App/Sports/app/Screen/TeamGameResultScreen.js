import React, {Component} from 'react';
import { Image, View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon, Card, Divider } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'

export default class TeamGameResultScreen extends Component{
    static navigationOptions = {
        tabBarLabel: "경기 전적",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="flag" size={25} type="font-awesome" color={tintColor} />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            resultData: [
                {
                    oppositeTeam: '감자',
                    myTeamScore: '2',
                    oppositeTeamScore: '3',
                    win: false,
                    date: '2019-05-17',
                    gym: '국사봉 체육관',
                    MVP: '왕감자'
                },
                {
                    oppositeTeam: '고구마',
                    myTeamScore: '4',
                    oppositeTeamScore: '3',
                    win: true,
                    date: '2019-05-15',
                    gym: '국사봉 체육관',
                    MVP: '호박고구마'
                },
                {
                    oppositeTeam: '당근',
                    myTeamScore: '1',
                    oppositeTeamScore: '3',
                    win: false,
                    date: '2019-05-14',
                    gym: '국사봉 체육관',
                    MVP: '바니바니'
                },,
                {
                    oppositeTeam: '배추',
                    myTeamScore: '4',
                    oppositeTeamScore: '1',
                    win: true,
                    date: '2019-05-12',
                    gym: '국사봉 체육관',
                    MVP: '김치'
                },
            ]
        }
    }
    
    render(){
        const MyTeamInfo = this.props.navigation.getParam("MyTeamInfo");

        return(
            <View style={{flex: 1, backgroundColor: global.backgroundColor}}>
                <HeaderInfo headerTitle="경기 전적" navigation={this.props.navigation}></HeaderInfo>
                
                <View style={[styles.statisticsContainer, {backgroundColor: global.backgroundColor3}]}>
                    <Text style={[styles.score, {color: global.pointColor}]}>123 승 33 패</Text>
                </View>

                <Divider style={{height: 2, backgroundColor: "#e1e8ee"}}/>
                
                <View style={{flex: 3.5}}>
                    <ScrollView>
                        {
                            this.state.resultData.map((item, i) => {
                                return(
                                    <Card key={i}>
                                        <View style={{flex: 1}}>
                                            <View style={styles.titleContainer}>
                                                <View style={{flex: 1}}>
                                                    <Image
                                                        style={item.win ? [styles.image, {display: 'flex'}] : [styles.image, {display: 'none'}]}
                                                        source={require('../Images/win.png')}
                                                    />
                                                    <Text style={item.win ? styles.winnerTeamName : styles.loserTeamName}>{MyTeamInfo.name}</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Text style={[styles.score, {color: global.pointColor}]}>{item.myTeamScore} : {item.oppositeTeamScore}</Text>
                                                </View>
                                                <View style={{flex: 1}}>
                                                    <Image
                                                        style={item.win ? [styles.image, {display: 'none'}] : [styles.image, {display: 'flex'}]}
                                                        source={require('../Images/win.png')}
                                                    />
                                                    <Text style={item.win ? styles.loserTeamName : styles.winnerTeamName}>{item.oppositeTeam}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Divider style={{height: 2, backgroundColor: "#e1e8ee"}}/>
                                        <View style={{flex: 4, marginTop: 15}}>
                                            <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
                                                <View style={{flex: 1}}><Text style={styles.contentTitle}>경기일자</Text></View>
                                                <View style={{flex: 1}}><Text style={styles.contentTitle}>장소</Text></View>
                                                <View style={{flex: 1}}><Text style={styles.contentTitle}>MVP</Text></View>
                                            </View>
                                            <View style={{flex: 4, flexDirection: 'row', marginTop: 5}}>
                                                <View style={{flex: 1}}><Text style={styles.content}>{item.date}</Text></View>
                                                <View style={{flex: 1}}><Text style={styles.content}>{item.gym}</Text></View>
                                                <View style={{flex: 1}}><Text style={styles.content}>{item.MVP}</Text></View>
                                            </View>
                                        </View>
                                        <View style={{flex: 1}}>
                                        </View>
                                    </Card>
                                );
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statisticsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: -1
    },
    titleContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems:'center',
        marginBottom: 10
    },
    winnerTeamName:{
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: -14
    },
    loserTeamName:{
        color: "black",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    score:{
        fontSize: 33,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: -3
    },
    contentTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 10
    },
    content: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    image: {
        position: 'relative',
        top: -15,
        left: 0,
        width: '30%',
        height: '30%',
    }
});