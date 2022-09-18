import React from "react";
import { Dimensions, FlatList } from "react-native";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { useGetUserFeedQuery } from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import styles from "./style";

export default function Feed() {
	const { data: questions, isError, error, isLoading } = useGetUserFeedQuery();

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	} else if (isError) {
		console.log(error);
		return (
			<View style={styles.container}>
				<Text>Error</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={questions as IQuestionFeed[]}
				renderItem={({ item }: { item: IQuestionFeed }) => {
					return <Question question={item} key={item.id} />;
				}}
				showsVerticalScrollIndicator={false}
				snapToInterval={Dimensions.get("window").height}
				snapToAlignment={"start"}
				decelerationRate={"fast"}
			></FlatList>
		</View>
	);
}
