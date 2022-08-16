import { FontAwesome, Fontisto } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import Question from "../../components/Question";

import Constants from "expo-constants";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { QuestionType, RootTabScreenProps } from "../../types";
import styles from "./style";

export default function Feed({ navigation }: RootTabScreenProps<"Feed">) {
	const [questions, setQuestions] = useState<QuestionType[]>([]);
	const questionAPIUrl = Constants?.manifest?.extra?.questionAPIUrl;

	const getQuestion = async () => {
		const url = `${questionAPIUrl}/questions`;
		const response = await axios(url);
		return response.data;
	};

	useEffect(() => {
		const fetchPost = async () => {
			const questions: QuestionType[] = await getQuestion();
			setQuestions(questions);
		};

		fetchPost();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={questions}
				renderItem={({ item }: { item: QuestionType }) => {
					return <Question question={item} key={item.id} />;
				}}
				showsVerticalScrollIndicator={false}
				snapToInterval={Dimensions.get("window").height}
				snapToAlignment={"start"}
				decelerationRate={"fast"}
			></FlatList>
			<View style={styles.topIconsLeft}>
				<TouchableHighlight
					onPress={() => {
						navigation.openDrawer();
					}}
				>
					<Text>
						<FontAwesome name="chevron-left" size={45} color={pinkPickle} />
					</Text>
				</TouchableHighlight>
			</View>
			<View style={styles.topIconsRight}>
				<Text>
					<Fontisto name="zoom" size={45} color={pinkPickle} />
				</Text>
			</View>
		</View>
	);
}
