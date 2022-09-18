import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { useLogoutMutation } from "../../store/features/auth/authApi";
import { CustomButton } from "../Button";
import { View } from "../Themed";
import styles from "./styles";

const CustomDrawer = (props: any) => {
	const [logout, { isLoading, isError }] = useLogoutMutation();

	const logoutHandler = async () => {
		await logout()
			.unwrap()
			.then(() => {
				props.navigation.dispatch(DrawerActions.closeDrawer());
			});
	};

	return (
		<View style={styles.container}>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.containerScroll}>
				<View style={styles.list}>
					<DrawerItem
						label="Create Question"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("CreateQuestion");
						}}
					/>
					<DrawerItem
						label="Feed"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("Feed");
						}}
					/>
					<DrawerItem
						label="Mon Profile"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("ProfileStackNavigator");
						}}
					/>
					<DrawerItem
						label="Réglages"
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("SettingsStack");
						}}
					/>
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 35 }}>
				<CustomButton title={"Logout"} color="pink" onPress={logoutHandler} />
			</View>
		</View>
	);
};

export default CustomDrawer;
