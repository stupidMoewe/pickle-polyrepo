import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { useGetMeQuery, useLogoutMutation } from "../../store/features/auth/authApi";
import { Text, View } from "../Themed";
import styles from "./styles";

const CustomDrawer = (props: any) => {
	const dispatch = useAppDispatch();

	const { data: user, isLoading, isError } = useGetMeQuery();

	const [logout] = useLogoutMutation();

	const logoutHandler = async () => {
		await props.navigation.dispatch(DrawerActions.closeDrawer());
		logout();
	};

	return (
		<View style={styles.container}>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.containerScroll}>
				<View style={styles.list}>
					<DrawerItem
						label={user!.username || "username"}
						labelStyle={styles.text}
						onPress={() => {}}
					/>
					<DrawerItem
						label={"Create Question"}
						labelStyle={styles.text}
						onPress={() => {
							props.navigation.navigate("RootStackNavigator", {
								screen: "CreateQuestion",
							});
						}}
					/>
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
				<TouchableOpacity onPress={logoutHandler}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text style={styles.text}>Logout</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default CustomDrawer;
