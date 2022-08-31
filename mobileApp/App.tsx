import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import styles from "./styles";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import store from "./store/app/store";

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<AuthProvider>
				<Provider store={store}>
					<SafeAreaProvider style={styles.container}>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</SafeAreaProvider>
				</Provider>
			</AuthProvider>
		);
	}
}
