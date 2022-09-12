/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionSpecs } from "@react-navigation/stack";
import React from "react";
import { ColorSchemeName, Dimensions } from "react-native";
import CustomDrawer from "../components/Drawer";
import { Text, View } from "../components/Themed";
import AuthChoice from "../screens/AuthChoice";
import CreateQuestion from "../screens/CreateQuestion";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import OnBoardingScreen from "../screens/OnBoarding";
import Profile from "../screens/Profile";
import SingleQuestion from "../screens/SingleQuestion";
import { useGetMeQuery } from "../store/features/auth/authApi";
import LinkingConfiguration from "./LinkingConfiguration";

const width = Dimensions.get("window").width;

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

export type RootStackParamList = {
	Feed: undefined;
	Profile: undefined;
	SingleQuestion: undefined;
	CreateQuestion: undefined;
	OnBoardingScreen: undefined;
	AuthChoice: undefined;
	Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function RootNavigator() {
	const { data: user, isError, isLoading } = useGetMeQuery();

	const returnElement = isLoading ? (
		<View>
			<Text>Loading</Text>
		</View>
	) : (
		<>
			{user?.id ? (
				<Drawer.Navigator
					initialRouteName="Feed"
					drawerContent={(props) => <CustomDrawer {...props} />}
					screenOptions={{
						headerShown: false,
						drawerStyle: {
							width: "100%",
						},
						swipeEdgeWidth: width,
					}}
				>
					<>
						<Drawer.Screen name="Feed" component={Feed} />
						<Drawer.Screen name="Profile" component={Profile} />
						<Drawer.Screen name="SingleQuestion" component={SingleQuestion} />
						<Drawer.Screen name="CreateQuestion" component={CreateQuestion} />
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
					<Stack.Screen name="AuthChoice" component={AuthChoice} />
					<Stack.Screen name="Login" component={Login} />
					{/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

					{/* <Drawer.Group screenOptions={{ presentation: "modal" }}>
				</Drawer.Group> */}
				</Stack.Navigator>
			)}
		</>
	);

	return returnElement;
}
