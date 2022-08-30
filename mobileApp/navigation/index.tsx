/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import CreateQuestion from "../screens/CreateQuestion";
import Feed from "../screens/Feed";

import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../components/Drawer";
import { Text, View } from "../components/Themed";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/Login";
import OnBoardingScreen from "../screens/OnBoarding";
import Profile from "../screens/Profile";
import SingleQuestion from "../screens/SingleQuestion";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function RootStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Feed" component={Feed} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="SingleQuestion" component={SingleQuestion} />
			<Stack.Screen name="CreateQuestion" component={CreateQuestion} />
		</Stack.Navigator>
	);
}

function RootNavigator() {
	const { authData, loading } = useAuth();
	if (loading) {
		return (
			<View>
				<Text>Loading</Text>
			</View>
		);
	}
	return (
		<>
			{authData ? (
				<Drawer.Navigator
					initialRouteName="RootStackNavigator"
					drawerContent={(props) => <CustomDrawer {...props} />}
					screenOptions={{
						headerShown: false,
					}}
				>
					<>
						<Drawer.Screen
							name="RootStackNavigator"
							component={RootStackNavigator}
						></Drawer.Screen>
					</>
				</Drawer.Navigator>
			) : (
				<Stack.Navigator
					initialRouteName="OnBoardingScreen"
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
					<Stack.Screen name="Login" component={Login} />
					{/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

					{/* <Drawer.Group screenOptions={{ presentation: "modal" }}>
				</Drawer.Group> */}
				</Stack.Navigator>
			)}
		</>
	);
}
