import React, {Component} from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { ListItem, Avatar, SearchBar } from 'react-native-elements'
import Util from './Util'

export class MemberList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            playerList: []
        }
    }
    
    componentDidMount(){
        this.setState({playerList: this.props.playerList})
    }

    viewPlayerDetail = (player) => {
        this.props.navigation.navigate(this.props.DetailScreen, {"player": player});
    }

    updateSearch = search => {
        this.setState({search});
        if(search == ''){
            this.setState({playerList: this.props.playerList})
        }
        else{
            list = []
            playerList = this.props.playerList;
            for(let i = 0; i < playerList.length; i++){
                console.log(playerList[i])
                if(playerList[i].name.includes(search) == true)
                    list.push(playerList[i]);
            }
            this.setState({playerList: list})
        }
    };

    render(){
        const { search } = this.state;

        return(
            <View style={{flex: 1}}>
                <SearchBar
                    containerStyle={{marginTop: -1, backgroundColor: global.backgroundColor3}}
                    inputContainerStyle={{marginTop: -1, height: 30, backgroundColor: global.backgroundColor3}}
                    inputStyle={{fontSize: 16, marginTop: 3}}
                    placeholder="회원 검색"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <ScrollView>
                {
                    this.state.playerList.map((player, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={
                                <Avatar
                                    rounded
                                    source={Util.MMRToURL(player.MMR)}
                                    avatarStyle={{backgroundColor: 'white'}}
                                />
                            }
                            title={player.name}
                            subtitle={player.MMR}
                            chevron
                            titleStyle={styles.title}
                            onPress={()=>this.viewPlayerDetail(player)}
                        />
                    ))
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#000'
    }
});