import { FontAwesome, Fontisto } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import Question from "../../components/Question";

import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { RootTabScreenProps } from "../../types";
import Constants from "expo-constants";
import styles from "./style";

interface IQuestion {
	id: number;
	title: string;
	questionType: "Text" | "Image";
	answer1: string; // written answer or image url
	answer2: string;
	image?: string;
}

export default function Feed({ navigation }: RootTabScreenProps<"Feed">) {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const questionAPIUrl = Constants?.manifest?.extra?.questionAPIUrl;

	const getQuestion = async () => {
		const url = `${questionAPIUrl}/questions`;
		const response = await axios(url);
		return response.data;
	};

	useEffect(() => {
		const fetchPost = async () => {
			const questions = await getQuestion();
			setQuestions(questions);
		};

		fetchPost();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={questions}
				renderItem={({ item }: { item: IQuestion }) => (
					<Question question={item} key={item.id} navigation={navigation} />
				)}
				showsVerticalScrollIndicator={false}
				snapToInterval={Dimensions.get("window").height}
				snapToAlignment={"start"}
				decelerationRate={"fast"}
			></FlatList>
			<View style={styles.topIconsLeft}>
				<Text>
					<FontAwesome name="chevron-left" size={45} color={pinkPickle} />
				</Text>
			</View>
			<View style={styles.topIconsRight}>
				<Text>
					<Fontisto name="zoom" size={45} color={pinkPickle} />
				</Text>
			</View>
		</View>
	);
}
