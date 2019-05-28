import React, {Component} from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'

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
                <ScrollView>
                {
                    this.props.playerList.map((player, i) => (
                        
                    
                    <ListItem
                        key={i}
                        // leftAvatar={{ source: require('../Images/Bronze.png') }}
                        leftAvatar={
                            <Avatar
                                rounded
                                source={require('../Images/Ruby.png')}
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