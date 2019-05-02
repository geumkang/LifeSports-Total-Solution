import React from "react";
import { View, Text } from "react-native";
import { Header, Avatar, Icon } from 'react-native-elements'

export class HeaderInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <Header
                innerContainerStyles={{flexDirection: 'row'}}
                backgroundColor='#f40057'
                leftComponent={<Avatar
                                    small
                                    rounded
                                    source={{uri: "http://www.usanetwork.com/sites/usanetwork/files/styles/629x720/public/2016/07/mrrobot_s2_cast_rami-malek2.jpg"}}
                                    onPress={() => this.goToProfileDetail()}
                                    activeOpacity={0.7}
                                />}
                centerComponent={ <View style={{alignItems: 'center'}}>
                                    <Text style={{justifyContent: 'center', color: '#fff', alignContent:'center'}}>{this.props.headerTitle}</Text>
                                    </View>}
                rightComponent={<Icon name={'settings-applications'} color={'#fff'} onPress={() => this.goToProfileDetail()}/>}
            />
        );
    }
}