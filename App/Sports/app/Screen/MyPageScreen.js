import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'
import * as Keychain from 'react-native-keychain';

import {HeaderInfo} from '../Component/HeaderInfo'
import {MemberDetail} from '../Component/MemberDetail';

export default class MyPageScreen extends Component {
    constructor(props) {
        super(props);
        state = {
        }
    }

    logout = async () => {
        
        await Keychain.resetGenericPassword()
        console.log("Credentials removed Successfully")
        global.loginStatus = false;
        global.hasTeam = true;
        global.UDID = '';
        global.ID = '';
        global.name = '';

        // 메인 화면 정보 초기화
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="마이 페이지" navigation={this.props.navigation}></HeaderInfo>
                <MemberDetail
                    UDID={global.UDID}
                ></MemberDetail>
                <Button
                    title="로그아웃"
                    buttonStyle={{backgroundColor: global.pointColor}}
                    titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                    onPress={this.logout}/>
            </View>
        );
    }
}