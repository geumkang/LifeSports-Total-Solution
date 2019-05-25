import React, {Component} from 'react';
import { View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements'

export class MemberList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    viewPlayerDetail = (player) => {
        this.props.navigation.navigate(this.props.DetailScreen, {"player": player});
    }

    render(){
        return(
            <View style={{flex: 1}}>
                {
                    this.props.playerList.map((player, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: player.avatar_url } }}
                        title={player.name}
                        subtitle={player.subtitle}
                        chevron
                        titleStyle={styles.title}
                        onPress={()=>this.viewPlayerDetail(player)}
                    />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#000'
    }
});