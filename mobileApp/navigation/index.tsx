/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import CreateQuestion from "../screens/CreateQuestion";
import Feed from "../screens/Feed";
import Menu from "../screens/Login";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import OnBoardingScreen from "../screens/OnBoarding";
import Profile from "../screens/Profile";
import LinkingConfiguration from "./LinkingConfiguration";
import CustomDrawer from "../components/Drawer";

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

const isLoggedIn = () => {
	return true;
};

function RootNavigator() {
	return (
		// <Stack.Navigator screenOptions={{ headerShown: false }}>
		<Drawer.Navigator
			initialRouteName="Feed"
			drawerContent={(props) => <CustomDrawer {...props} />}
			screenOptions={{
				headerShown: false,
				// drawerActiveBackgroundColor: "#aa18ea",
				// drawerActiveTintColor: "#fff",
				// drawerInactiveTintColor: "#333",
				// drawerLabelStyle: {
				// 	marginLeft: -25,
				// 	fontFamily: "Roboto-Medium",
				// 	fontSize: 15,
				// },
			}}
		>
			{isLoggedIn() ? (
				<>
					<Drawer.Screen name="Feed" component={Feed} />
					{/* <Drawer.Screen name="Menu" component={Menu} /> */}
					{/* <Drawer.Screen name="Profile" component={Profile} /> */}
					<Drawer.Screen name="CreateQuestion" component={CreateQuestion} />
				</>
			) : (
				<>
					<Drawer.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
					{/* <Stack.Screen name="Login" component={LoginScreen} /> */}
					{/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
				</>
			)}
			{/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group> */}
		</Drawer.Navigator>
	);
}
