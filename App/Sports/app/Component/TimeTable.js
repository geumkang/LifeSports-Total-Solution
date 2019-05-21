import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Agenda } from 'react-native-calendars';

export class TimeTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            items: {
                name: "title",
                type: 1, // 예약 빈거 : 1 / 예약 찬거 : 2 / 휴무 : 0  ///  매칭 : 1 / 휴무 : 0
                startTime: '09:00',
                endTime: '09:30',
                currentParticipant: 15,
                maxParticipant: 30
            },
            marks: {}
                // '2019-05-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
                // '2019-05-26': {dots: [massage, workout], disabled: true}
            
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
            date: year + '-' + month + '-' + day
        })
        
    }

    render(){
        // const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
        // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
        // const workout = {key:'workout', color: 'green'};

        return(
            <View style={{flex: 1, backgroundColor: global.backgroundColor, paddingBottom: 10}}>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.date}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    markedDates={this.state.marks}
                    markingType={'multi-dot'}
                />
            </View>
        )
    }

    scheduleRequest() {
        let data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                'gym_ID' : this.props.gym_ID,
                'subj_ID' : this.state.selectedSubj_ID
            })
        }
        let gymInfoList = [];
        return fetch('http://' + global.appServerIp + '/gym', data)
            .then((response) => response.json())
            .then((responseJson) => {
                
                for(var i = 0; i < responseJson.length; i++){
                    gymInfoList.push({
                        key: responseJson[i].gym_ID,
                        coordinate: {
                            latitude: responseJson[i].gym_latitude,
                            longitude: responseJson[i].gym_longitude
                        }                                
                    })
                }
                this.setState({
                    markers: gymInfoList
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: "title",
                            type: 1, // 예약 빈거 : 1 / 예약 찬거 : 2 / 휴무 : 0  ///  매칭 : 1 / 휴무 : 0
                            startTime: '09:00',
                            endTime: '09:30',
                            currentParticipant: 10,
                            maxParticipant: 30,
                            height: 120
                        });
                        this.state.items[strTime].push({
                            name: "title",
                            type: 2, // 예약 빈거 : 1 / 예약 찬거 : 2 / 휴무 : 0  ///  매칭 : 1 / 휴무 : 0
                            startTime: '09:00',
                            endTime: '09:30',
                            currentParticipant: 7,
                            maxParticipant: 30,
                            height: 120
                        });
                        this.state.items[strTime].push({
                            name: "title",
                            type: 3, // 예약 빈거 : 1 / 예약 찬거 : 2 / 휴무 : 0  ///  매칭 : 1 / 휴무 : 0
                            startTime: '09:00',
                            endTime: '09:30',
                            currentParticipant: 5,
                            maxParticipant: 30,
                            height: 120
                        });
                    }
                }
            }
            // console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        console.log(`Load Items for ${day.year}-${day.month}`);
    }
    
    onPressItem = (item) => {
        const statusList = this.props.statusList;
        const step = Number(this.props.step);
        statusList[step] = item.name;
        
        // ...예약 정보 로드 {"statusList": statusList}

        this.props.navigation.navigate("ReservationCheck", {"statusList": statusList, "step": Number(step)+1, "item": item});
    }

    renderItem(item) {
        const typeColor = ["#4CAF50", "#FF9800", "#E91E63"];
        const ratioColor = ["#388E3C", "#F57C00", "#C2185B"];
        
        if(this.props.statusList[0] == "예약")
            reservType = true;
        else
            reservType = false;
            
        const ratio = Math.round(Number(item.currentParticipant / item.maxParticipant) * 100) + '%'
        return (
            reservType ? (
                <View style={[styles.item, {height: item.height, backgroundColor: typeColor[item.type - 1]}]}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>this.onPressItem(item)}>
                        <View style={{width: ratio, height: '100%', position: 'absolute', backgroundColor: ratioColor[item.type - 1]}}></View>
                        <Text style={styles.time}>{item.startTime} ~ {item.endTime}</Text>
                        <Text style={styles.title}>{item.name}</Text>    
                        <Text style={styles.content}>{item.currentParticipant} / {item.maxParticipant}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={[styles.item, {height: item.height, backgroundColor: typeColor[item.type - 1]}]}>
                    <TouchableOpacity style={{flex: 1}} onPress={()=>this.onPressItem(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </View> 
            )
        );
    }
    
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>이 날은 운영하지 않습니다</Text></View>
        );
    }
    
    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }
    
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
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