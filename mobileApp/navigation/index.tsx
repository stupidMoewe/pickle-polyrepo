import { createDrawerNavigator } from "@react-navigation/drawer";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ColorSchemeName, Dimensions } from "react-native";
import CustomDrawer from "../components/Drawer";
import { Text, View } from "../components/Themed";
import AdvancedCreateQuestion from "../screens/AdvancedCreateQuestion";
import AuthChoice from "../screens/AuthChoice";
import CreateQuestion from "../screens/CreateQuestion";
import Feed from "../screens/Feed";
import Login from "../screens/Login";
import OnBoardingScreen from "../screens/OnBoarding";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Settings from "../screens/Settings";
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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileStackNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Drawer.Screen name="Profile" component={Profile} />
		<Stack.Screen name="SingleQuestion" component={SingleQuestion} />
	</Stack.Navigator>
);

const SettingsStack = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name="Settings" component={Settings} />
	</Stack.Navigator>
);

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
					initialRouteName="SettingsStack"
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
						<Stack.Screen name="CreateQuestion" component={CreateQuestion} />
						<Drawer.Screen
							name="ProfileStackNavigator"
							component={ProfileStackNavigator}
						></Drawer.Screen>
						<Drawer.Screen
							name="AdvancedCreateQuestion"
							component={AdvancedCreateQuestion}
						/>
						<Drawer.Screen name="SettingsStack" component={SettingsStack} />
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
					<Stack.Screen name="Register" component={Register} />
				</Stack.Navigator>
			)}
		</>
	);

	return returnElement;
}
