import React, {Component} from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements"

import {HeaderInfo} from '../Component/HeaderInfo'
import {MyMapView} from '../Component/MyMapView'

export default class ReservationStatusScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            detail: '',
            address: '',
            openTime: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: '예약경기1',
            detail: '국사봉체육관',
            address: '국사국사',
            openTime: '09:00 ~ 11:00'
        })
    }

    render(){
        const detailViewStyle = StyleSheet.create({
            detailView: {
                flex: 1,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 15,
                paddingRight: 15,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                width: '100%',
                backgroundColor: global.backgroundColor3
            }
        });

        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="예약 정보" navigation={this.props.navigation}></HeaderInfo>
                <View style={{flex: 1}}>
                    <MyMapView/>
                </View>

                <View style={{flex: 2}}>
                    <View style={detailViewStyle.detailView}>
                        <View style={{height: 35, flexDirection: 'row', marginBottom: 5}}>
                            <Text style={styles.Header} adjustsFontSizeToFit={true} numberOfLines={1}>{this.state.title}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.Title}>소개</Text>
                                <Text style={styles.Title}>주소</Text>
                                <Text style={styles.Title}>운영 시간</Text>
                                <Text style={styles.Title}>운영 시간</Text>
                                <Text style={styles.Title}>운영 시간</Text>
                                <Text style={styles.Title}>운영 시간</Text>
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={styles.Detail}>{this.state.detail}</Text>
                                <Text style={styles.Detail}>{this.state.address}</Text>
                                <Text style={styles.Detail}>{this.state.openTime}</Text>
                                <Text style={styles.Detail}>{this.state.openTime}</Text>
                                <Text style={styles.Detail}>{this.state.openTime}</Text>
                                <Text style={styles.Detail}>{this.state.openTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Header: {
        height: 35,
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        textAlignVertical: 'center',
        color: "#fff"
    },
    Title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#fff"
    },
    Icon:{
        paddingTop: 5,
        marginRight: 20
    },
    Detail: {
        paddingLeft: 15,
        flex: 1,
        fontSize: 16,
        textAlignVertical: 'center',
        color: "#fff"
    },
    nextBtn:{
    }
});