import React, {Component} from 'react';
import { View } from "react-native";

import {HeaderInfo} from '../Component/HeaderInfo'

export default class ReservationStatusScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="예약 정보" navigation={this.props.navigation}></HeaderInfo>

            </View>
        );
    }
}