import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'

import {HeaderInfo} from '../Component/HeaderInfo'
import {SelectStatus} from '../Component/SelectStatus'
import {MyMapView} from '../Component/MyMapView'

export default class SelectRegionScreen extends Component {
    constructor(props) {
        super(props);
        this.showDetailView = this.showDetailView.bind(this);
        this.hideDetailView = this.hideDetailView.bind(this);
        this.state = {
            showDetail: false,
            modalVisible: false,
            gymInfo: {
                key: 0,
                title: "국사봉 체육관",
                detail: "어서오세용",
                address: "서울시 동작구 상도동 머시기",
                openTime: "09:00 ~ 18:00",
                favorite: true
            }
        };
    }

    showDetailView = () => this.setState({ modalVisible: true })
    hideDetailView = () => this.setState({ modalVisible: false })
    toggleFavorite = () => {
        this.state.gymInfo.favorite = !this.state.gymInfo.favorite
        this.forceUpdate()
    }

    render() {
		const list = [
			{
				name: '서울시',
				bgColor: "#00f"
			},
			{
				name: '경기도',
				bgColor: "#0f0"
            },
            {
				name: '충청도',
				bgColor: "#ff0"
            },
            {
				name: '경상도',
				bgColor: "#0ff"
			}
        ]
        
        const detailViewStyle = StyleSheet.create({
            detailView: {
                flex: 1,
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
                backgroundColor: "#fff"
            }
        });

        const statusList = this.props.navigation.getParam("statusList");
        const step = this.props.navigation.getParam("step");

		return (  
			<View style={{flex: 1}}>
				<HeaderInfo headerTitle="체육관 선택" navigation={this.props.navigation}></HeaderInfo>
                <SelectStatus statusList={statusList}></SelectStatus>
                
                <View>
                    <ListItem
                        key={i}
                        title="자주 가는 체육관"
                        chevron
                        onPress={()=>{
                            this.props.navigation.navigate("FavoriteGymList", {"statusList": statusList, "step": Number(step)});
                        }}
                        containerStyle={{backgroundColor: "#f40057"}}
                        titleStyle={{color: "#fff"}}
                    />
                </View>

                <MyMapView
                    showDetail={this.showDetailView}
                    hideDetail={this.hideDetailView}/>

                <Modal animationType={"slide"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={()=>{this.hideDetailView()}}>
                    <View style={{flex: 5}}> 
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={this.hideDetailView}></TouchableOpacity>
                    </View>
                    <View style={detailViewStyle.detailView}>
                        <View style={{height: 35, flexDirection: 'row', marginBottom: 5}}>
                            <Text style={styles.Header}>{this.state.gymInfo.title}</Text>
                            {
                                this.state.gymInfo.favorite ?
                                <Icon iconStyle={styles.Icon} name='favorite' color="#f40057"
                                    onPress={this.toggleFavorite}></Icon>
                                :
                                <Icon iconStyle={styles.Icon} name='favorite-border'
                                    onPress={this.toggleFavorite}></Icon>
                            }
                            
                            <Button
                                title="NEXT STEP"
                                style={styles.nextBtn}
                                onPress={()=>{
                                    this.hideDetailView();
                                    statusList[step] = this.state.gymInfo.title;
                                    this.props.navigation.navigate("SelectPlan", {"statusList": statusList, "step": Number(step)+1});
                                }}
                            />
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles.Title}>소개</Text>
                                <Text style={styles.Title}>주소</Text>
                                <Text style={styles.Title}>운영 시간</Text>
                            </View>
                            <View style={{flex: 4}}>
                                <Text style={styles.Detail}>{this.state.gymInfo.detail}</Text>
                                <Text style={styles.Detail}>{this.state.gymInfo.address}</Text>
                                <Text style={styles.Detail}>{this.state.gymInfo.openTime}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    Header: {
        height: 35,
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        textAlignVertical: 'center',
        color: "#000"
    },
    Title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#000"
    },
    Icon:{
        paddingTop: 5,
        marginRight: 20
    },
    Detail: {
        paddingLeft: 15,
        flex: 1,
        fontSize: 15,
        textAlignVertical: 'center',
        color: "#000"
    },
    nextBtn:{
    }
});