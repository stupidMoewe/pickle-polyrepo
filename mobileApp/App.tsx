import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PersistGate } from "redux-persist/integration/react";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { store } from "./store/app/store";
import styles from "./styles";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			// <AuthProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider style={styles.container}>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
			// </AuthProvider>
		);
	}
}
