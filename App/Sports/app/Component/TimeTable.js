import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Agenda } from 'react-native-calendars';

export class TimeTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            items: {},
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
            <View style={{flex: 1, backgroundColor: "#C0C0C0", paddingBottom: 10}}>
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
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            type: Math.floor((Math.random() * 3) + 1)
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
        const typeColor = ["#ff0", "#0ff", "#0f0"]
        
        return (
            <View style={[styles.item, {height: item.height, backgroundColor: typeColor[item.type - 1]}]}>
                <TouchableOpacity style={{flex: 1}} onPress={()=>this.onPressItem(item)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>
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
        padding: 10,
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
    }
});