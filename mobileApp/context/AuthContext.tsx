import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import React, { createContext, useContext, useEffect, useState } from "react";

const userAPIUrl = Constants?.manifest?.extra?.userAPIUrl;

interface LoginData {
	email: string;
	password: string;
}
interface RegisterData {
	email: string;
	username: string;
	password: string;
}

// interface QuestionType {
// 	id: number;
// 	title: string;
// 	answer1: string;
// 	answer2: string;
// }

interface AuthData {
	userId: string;
	username: string;
	email: string;
	questions: string[];
	likesCount: number;
}

interface AuthContextData {
	authData?: AuthData;
	loading: boolean;
	login({ email, password }: LoginData): Promise<void>;
	logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = useState<AuthData>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadStorageData();
	}, []);

	async function loadStorageData(): Promise<void> {
		try {
			const authDataSerialized = await AsyncStorage.getItem("userData");
			if (authDataSerialized) {
				const _authData: AuthData = JSON.parse(authDataSerialized);
				setAuthData(_authData);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	}

	const login = async ({ email, password }: LoginData) => {
		try {
			const url = `${userAPIUrl}/login`;
			const response = await axios(url, {
				method: "POST",
				data: {
					email,
					password,
				},
			});
			const authDataResponse: AuthData = {
				userId: response.data.id,
				username: response.data.username,
				email: response.data.email,
				questions: response.data.questions,
				likesCount: response.data.likesCount,
			};
			setAuthData(authDataResponse);
			const stringAuthData = JSON.stringify(authDataResponse);
			await AsyncStorage.setItem("userData", stringAuthData);
		} catch (err) {
			console.log(err);
		}
	};

	const logout = async () => {
		setAuthData(undefined);
		await AsyncStorage.removeItem("userData");
	};

	return (
		<AuthContext.Provider value={{ authData, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}

export { AuthContext, AuthProvider, useAuth };
