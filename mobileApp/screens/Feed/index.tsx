import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { useGetUserFeedQuery } from "../../store/features/feed/userFeedApi";
import { getUserFeed } from "../../store/features/question/questionSlice";
import { IQuestionFeed } from "../../types";
import styles from "./style";

export default function Feed() {
	const navigation = useNavigation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserFeed());
	}, [dispatch]);

	// const userFeedQuestion = useAppSelector((state) => state.userFeed.questions);
	const { data: userFeedQuestion = [], error } = useGetUserFeedQuery("");

	if (error) {
		console.log("error userFeed", error);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={userFeedQuestion as IQuestionFeed[]}
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
