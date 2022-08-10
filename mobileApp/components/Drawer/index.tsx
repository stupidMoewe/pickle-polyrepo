import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text } from "../Themed";
import styles from "./styles";

const CustomDrawer = (props: any) => {
	return (
		<View style={styles.container}>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.containerScroll}>
				<View style={styles.list}>
					<DrawerItem label="Recherche" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem
						label="Feed"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("Feed");
						}}
					/>
					<DrawerItem label="Réglages" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Mon Profile" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Mes Signets" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Assistance" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Pigeon" labelStyle={styles.text} onPress={() => {}} />
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
				<TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={styles.text}>Sign Out</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CustomDrawer;
