import React, {Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { CheckBox } from 'react-native-elements'

import {HeaderInfo} from '../Component/HeaderInfo'
import {SelectStatus} from '../Component/SelectStatus'

export default class ReservationCheckScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    onPressCheckBox = () => {
        this.setState({checked:!this.state.checked});
    }

    onPressComplete = () => {
        // 일정 업뎃 완료되면 go
        this.props.navigation.popToTop();
    }

    viewPlayerList = (item) => {
        // PlayerList 받아오기
        this.props.navigation.navigate("JoinPlayerList", {"item": item, "headerTitle": "참여자 목록"});
    }

    render() {
        const statusList = this.props.navigation.getParam("statusList");
        const step = this.props.navigation.getParam("step");
        const selectItem = this.props.navigation.getParam("item");

        let reserveType;
        
        if(statusList[0] == "예약"){ //  && selectItem.type == 1
            reserveType = <NewReservation item={selectItem} 
                                        checked={this.state.checked}
                                        onPressCheckBox={()=>this.onPressCheckBox()}
                                        onPressComplete={()=>this.onPressComplete()}/>
        }
        else if(statusList[0] == "예약"){ //  && selectItem.type == 2
            reserveType = <NewReservation item={selectItem}
                                        checked={this.state.checked}
                                        onPressCheckBox={()=>this.onPressCheckBox()}
                                        onPressComplete={()=>this.onPressComplete()}/>
        }
        else if(statusList[0] == "매칭"){
            reserveType = <Matching onPressNextBtn={()=>this.viewPlayerList(selectItem)}
                                    onPressComplete={()=>this.onPressComplete()}/>
        }

        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="예약하기" navigation={this.props.navigation}></HeaderInfo>
                <SelectStatus statusList={statusList}></SelectStatus>
                {reserveType}
            </View>
        );
    }
}

function NewReservation(props){
    return(
        <View style={styles.dialog}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.Title}>예약자</Text>
                    <Text style={styles.Title}>팀명</Text>
                    <Text style={styles.Title}>예약시간</Text>
                </View>
                <View style={{flex: 4}}>
                    <Text style={styles.Detail}>12</Text>
                    <Text style={styles.Detail}>꺕꺄뺘</Text>
                    <Text style={styles.Detail}>09:00~11:00</Text>
                </View>
            </View>
        
            <CheckBox
                center
                iconRight
                title='끼어들기 허용'
                checked={props.checked}
                onPress={props.onPressCheckBox}
                />
            
            <Text style={styles.Title}>예약 취소시 이러이러이러리</Text>
            <Button title="예약하기"
                    onPress={props.onPressComplete}></Button>
        </View>
    );
}

function JoinReservation(props){
    return(
        <View style={styles.dialog}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.Title}>예약자</Text>
                    <Text style={styles.Title}>팀명</Text>
                    <Text style={styles.Title}>팀원수</Text>
                    <Text style={styles.Title}>예약시간</Text>
                </View>
                <View style={{flex: 4}}>
                    <Text style={styles.Detail}>12</Text>
                    <Text style={styles.Detail}>꺕꺄뺘</Text>
                    <Text style={styles.Detail}>20</Text>
                    <Text style={styles.Detail}>09:00~11:00</Text>
                </View>
            </View>
            <Text style={styles.Title}>경기 취소시 이러이러이러리</Text>
            <Button title="참여하기"
                    onPress={props.onPressComplete}></Button>
        </View>
    );
}

function Matching(props){
    return(
        <View style={styles.dialog}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Text style={styles.Title}>참여자명</Text>
                    <Text style={styles.Title}>참여현황</Text>
                    <Text style={styles.Title}>참가자 목록</Text>
                    <Text style={styles.Title}>경기시간</Text>
                </View>
                <View style={{flex: 4}}>
                    <Text style={styles.Detail}>12</Text>
                    <Text style={styles.Detail}>10/20</Text>
                    <Button title="확인하기"
                            onPress={props.onPressNextBtn}></Button>
                    <Text style={styles.Detail}>09:00~11:00</Text>
                </View>
            </View>
            <Text style={styles.Title}>경기 취소시 이러이러이러리</Text>
            <Button title="참여하기"
                    onPress={props.onPressComplete}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    dialog: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        // marginRight: 10,
        marginTop: 17
    },
    Title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#000"
    },
    Detail: {
        paddingLeft: 15,
        flex: 1,
        fontSize: 15,
        textAlignVertical: 'center',
        color: "#000"
    },
    reserveBtn: {
        width: '100%',
        height: 30
    }
});