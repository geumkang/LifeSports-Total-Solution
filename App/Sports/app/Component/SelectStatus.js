import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";


export class SelectStatus extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const statusList = this.props.statusList;
        const styleList = [];        
        for(i = 0; i < 4; i++){
            if(statusList[i][0] == 'S')
                styleList[i] = styles.statusItem;
            else
                styleList[i] = styles.statusItemSelected;
        }

        return(
            <View style={styles.statusView}>
                <Text style={styleList[0]}>{statusList[0]}</Text>
                <Text style={styleList[1]}>{statusList[1]}</Text>
                <Text style={styleList[2]}>{statusList[2]}</Text>
                <Text style={styleList[3]}>{statusList[3]}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    statusView: {
        width: '100%',
        height: 40,
        flexDirection: 'row'
    },
    statusItem: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#000"
    },
    statusItemSelected: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#00f"
    }
});