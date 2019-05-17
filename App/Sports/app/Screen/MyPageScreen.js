import React, { Component } from 'react';
import { View } from 'react-native';

import {HeaderInfo} from '../Component/HeaderInfo'
import {MemberDetail} from '../Component/MemberDetail';

export default class MyPageScreen extends Component {
    constructor(props) {
        super(props);
        state = {
        }
    }

    render(){
        const myInfo = "서버에서 내 정보 받아오기"
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="마이 페이지" navigation={this.props.navigation}></HeaderInfo>
                <MemberDetail
                    player={myInfo}
                ></MemberDetail>
            </View>
        );
    }
}