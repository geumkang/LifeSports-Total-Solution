import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements'
import * as Keychain from 'react-native-keychain';

import {HeaderInfo} from '../Component/HeaderInfo'
import {MemberProfile} from '../Component/MemberProfile';

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
        global.gender = '';
        global.MMR = '';
        this.props.navigation.popToTop();
        // 메인 화면 정보 초기화
    }

    render(){
        const player = this.props.navigation.getParam("player");

        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="마이 페이지" navigation={this.props.navigation}></HeaderInfo>
                <ScrollView>
                    <MemberProfile
                        player={player}
                    ></MemberProfile>
                    <Button
                        title="로그아웃"
                        buttonStyle={{backgroundColor: global.pointColor, marginTop: 15}}
                        titleStyle={{color: "#000", fontWeight: 'bold', fontSize: 14}}
                        onPress={this.logout}/>
                </ScrollView>
            </View>
        );
    }
}