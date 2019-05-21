import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export class SelectMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        const menuList = this.props.menuList;
        const statusList = this.props.statusList;
        const step = Number(this.props.step);
        
        return(
            <View style={{flex: 1, backgroundColor: global.backgroundColor, paddingBottom: 10}}>
            {
                menuList.map((item, i) => (
                    <TouchableOpacity 
                        style={styles.selectMenu}
                        onPress={()=>{
                            statusList[step] = item.name;
                            this.props.navigation.navigate(this.props.nextPage, {"statusList": statusList, "step": Number(step)+1});
                        }}
                    >
                        <Text style={styles.item}>{item.name}</Text>
                    </TouchableOpacity>
                ))
            }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    selectMenu: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 15,
        marginBottom: 5,
        marginRight: 10,
        marginLeft: 10,
        justifyContent: 'center'
    },
    item: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
        color: "#000"
    }
  });

