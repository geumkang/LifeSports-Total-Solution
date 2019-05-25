import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Agenda } from 'react-native-calendars';
import Util from '../Component/Util'

export class TimeTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            items: {},
            marks: {}
                         
        }
    }

    componentDidMount() {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        
        if (month.length == 1)
			month = "0" + month;
		if (day.length == 1)
			day = "0" + day;

        this.setState({
            date: year + '-' + month + '-' + day,
            items: {}
        })
        
        this.scheduleRequest();
        
    }

    render(){
        console.log("Start Render")
        return(
            <View style={{flex: 1, backgroundColor: global.backgroundColor, paddingBottom: 10}}>
                <Agenda
                    items={this.state.items}
                    // loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.state.date}
                    renderItem={this.renderItem.bind(this)}
                    // renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                />
            </View>
        )
    }

    scheduleRequest() {
        this.setState({
            items: []
        })
        let reservType, sportType = 1;
        if(this.props.statusList[0] == "예약")
            reservType = '/schedule/scheduletypereserv';
        else
            reservType = '/schedule/scheduletypematch';

        sportType = Util.sportType(this.props.statusList[1])    

        let data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'gym_ID' : this.props.gym_ID,
                'subj_ID' : sportType
            })
        }
        let scheduleList = [];
        return fetch('http://' + global.appServerIp + reservType, data)
            .then((response) => response.json())
            .then((responseJson) => {

                if(responseJson.length > 0){
                    backupTime = Util.ISOToDate(responseJson[0].starttime)
                    this.state.items[backupTime] = [];
                }
                for(var i = 0; i < responseJson.length; i++){
                    const strTime = Util.ISOToDate(responseJson[i].starttime)
                    if(backupTime != strTime){
                        backupTime = strTime
                        this.state.items[strTime] = [];
                    }
                    this.state.items[strTime].push({
                        scheduleID: responseJson[i].schedule_ID,
                        name: responseJson[i].schedule_name,
                        gymID : responseJson[i].gym_ID,
                        startTime: Util.dateToTime(responseJson[i].starttime),
                        endTime: Util.dateToTime(responseJson[i].endtime),
                        curStatus: responseJson[i].cur_status,
                        type: responseJson[i].schedule_type,
                        height: 120,
                        currentParticipant: responseJson[i].cur_participant,
                        maxParticipant: responseJson[i].max_participant,
                        MyTeamName: responseJson[i].reserv_team_name,
                        opponentTeamName: responseJson[i].opponent_team_name,
                        isSolo: responseJson[i].is_solo
                        //min_participant
                    })
                }
                this.state.items['2019-05-24'] = [];
                this.state.items['2019-05-24'].push({
                    scheduleID: responseJson[0].schedule_ID,
                    name: responseJson[0].schedule_name,
                    gymID : responseJson[0].gym_ID,
                    startTime: Util.dateToTime(responseJson[0].starttime),
                    endTime: Util.dateToTime(responseJson[0].endtime),
                    curStatus: responseJson[0].cur_status,
                    type: 4,
                    height: 120
                })

                const newItems = {};
                Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
                console.log("라라라라랄")
                this.setState({
                    items: newItems
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onPressItem = (item) => {
        const statusList = this.props.statusList;
        const step = Number(this.props.step);
        statusList[step] = item.name;
        
        this.props.navigation.navigate("ReservationCheck", {"statusList": statusList, "step": Number(step)+1, "item": item});
    }

    renderItem(item) {
        console.log('아이템:', item)
        console.log("렌더 아이템");
        const typeColor = ["#4CAF50", "#FF9800", "#E91E63", "#2196F3"];
        const ratioColor = ["#388E3C", "#F57C00", "#C2185B", "#1976D2"];
        
        if(this.props.statusList[0] == "예약")
            reservType = true;
        else
            reservType = false;
            
        let ratio;
        if(!reservType)
            ratio = Math.round(Number(item.currentParticipant / item.maxParticipant) * 100) + '%'
        console.log(ratio)
        return (
            reservType ? (
                <View style={[styles.item, {height: item.height, backgroundColor: typeColor[item.type - 1]}]}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>this.onPressItem(item)}>
                        {/* {item.cur_status} ? <View style={{width: ratio, height: '100%', position: 'absolute', backgroundColor: ratioColor[item.type - 1]}}></View> */}
                        <Text style={styles.time}>{item.startTime} ~ {item.endTime}</Text>
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={[styles.item, {height: item.height, backgroundColor: typeColor[item.type - 1]}]}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>this.onPressItem(item)}>
                        <View style={{width: ratio, height: '100%', position: 'absolute', backgroundColor: ratioColor[item.type - 1]}}></View>
                        <Text style={styles.time}>{item.startTime} ~ {item.endTime}</Text>
                        <Text style={styles.title}>{item.name}</Text>    
                        <Text style={styles.content}>{item.currentParticipant} / {item.maxParticipant}</Text>
                    </TouchableOpacity>
                </View> 
            )
        );
    }
    
    // renderEmptyDate() {
    //     return (
    //         <View style={styles.emptyDate}><Text>이 날은 운영하지 않습니다</Text></View>
    //     );
    // }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
    
    // timeToString(time) {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    // }

    // dateToTime(date) {
    //     date = new Date(date);
        
    //     hour = date.getHours();
    //     hour = ("0" + hour).slice(-2)
        
    //     minute = date.getMinutes();
    //     minute = ("0" + minute).slice(-2)
        
    //     return hour + ':' + minute;
    // }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        backgroundColor: '#f00',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
        marginTop: 12,
        marginBottom: 5,
        marginLeft: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 5,
        marginLeft: 10
    },
    content: {
        fontSize: 14,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 5,
        marginLeft: 10
    }
    
});