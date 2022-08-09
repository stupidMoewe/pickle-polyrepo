import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useCachedResources from "./hooks/useCachedResources";
import CreateQuestion from "./screens/CreateQuestion";
import Feed from "./screens/Feed";
import Profile from "./screens/Profile";
import styles from "./styles";

const Stack = createNativeStackNavigator();

export default function App() {
	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name="Feed" component={Feed} />
						<Stack.Screen name="CreateQuestion" component={CreateQuestion} />
						<Stack.Screen name="Profile" component={Profile} />
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar />
			</SafeAreaProvider>
		);
	}
}
