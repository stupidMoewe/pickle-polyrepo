import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";

import { Text, View } from "../Themed";
import styles from "./styles";

const CustomDrawer = (props: any) => {
	const [loading, isLoading] = useState(false);
	const auth = useAuth();
	const logout = async () => {
		isLoading(true);
		await props.navigation.dispatch(DrawerActions.closeDrawer());
		auth.logout();
	};

	return (
		<View style={styles.container}>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.containerScroll}>
				<View style={styles.list}>
					<DrawerItem label="Recherche" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem
						label="Feed"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("RootStackNavigator", { screen: "Feed" });
						}}
					/>
					<DrawerItem label="Réglages" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem
						label="Mon Profile"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("RootStackNavigator", { screen: "Profile" });
						}}
					/>
					<DrawerItem label="Mes Signets" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Assistance" labelStyle={styles.text} onPress={() => {}} />
					<DrawerItem label="Pigeon" labelStyle={styles.text} onPress={() => {}} />
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
				<TouchableOpacity onPress={logout}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={styles.text}>Logout</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CustomDrawer;
