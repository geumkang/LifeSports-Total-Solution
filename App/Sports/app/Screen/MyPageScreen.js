import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';

import {HeaderInfo} from '../Component/HeaderInfo'

export default class MyPageScreen extends Component {
    constructor(props) {
        super(props);
        state = {
        }
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <HeaderInfo headerTitle="마이 페이지" navigation={this.props.navigation}></HeaderInfo>
            </View>
        );
    }
}