import React, {Component} from 'react';
import { View } from 'react-native';

import {HeaderInfo} from '../Component/HeaderInfo'
import {SelectStatus} from '../Component/SelectStatus'
import {TimeTable} from '../Component/TimeTable'

export default class SelectPlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const statusList = this.props.navigation.getParam("statusList");
        const step = this.props.navigation.getParam("step");
        
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="일정 선택"></HeaderInfo>
                <SelectStatus statusList={statusList}></SelectStatus>
                <TimeTable statusList={statusList} step={step} navigation={this.props.navigation}></TimeTable>
            </View>
        );
    }
}