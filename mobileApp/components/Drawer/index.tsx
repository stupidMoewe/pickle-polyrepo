import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useLogoutMutation } from "../../store/features/auth/authApi";
import { Text, View } from "../Themed";
import { CustomButton } from "../Button";
import styles from "./styles";
import { pinkPickle } from "../../constants/ThemeColors";

const CustomDrawer = (props: any) => {
	const [logout, { isLoading, isError }] = useLogoutMutation();

	const logoutHandler = async () => {
		await logout()
			.unwrap()
			.then(() => {
				props.navigation.dispatch(DrawerActions.closeDrawer());
			});
		// if (!isError && !isLoading) {
		// }
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
							props.navigation.navigate("Profile");
						}}
					/>
					<DrawerItem label="Réglages" labelStyle={styles.text} onPress={() => {}} />
				</View>
			</DrawerContentScrollView>
			<View style={{ padding: 35 }}>
				<CustomButton title={"Logout"} color="pink" onPress={logoutHandler} />
			</View>
		</View>
	);
};

export default CustomDrawer;
