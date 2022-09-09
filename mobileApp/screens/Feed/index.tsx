import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useGetUserFeedQuery } from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import styles from "./style";

export default function Feed() {
	const navigation = useNavigation();

	const { data: questions, error, isLoading } = useGetUserFeedQuery();

	if (isLoading || questions === undefined) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	} else if (error) {
		return (
			<View style={styles.container}>
				<Text>Error</Text>
				<Text>{error}</Text>
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
			<View style={styles.topIconsLeft}>
				<TouchableHighlight
					onPress={() => {
						navigation.dispatch(DrawerActions.openDrawer());
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
