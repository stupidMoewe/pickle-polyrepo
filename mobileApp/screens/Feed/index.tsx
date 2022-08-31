import { FontAwesome, Fontisto } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAuth } from "../../context/AuthContext";
import { AppDispatch } from "../../store/app/store";
import { getUserTimeline } from "../../store/features/timeline/timelineSlice";
import { useFetchTimelineQuery } from "../../store/features/timelineApiSlice";
import { IQuestionFeed, RootTabScreenProps } from "../../types";
import styles from "./style";

export default function Feed({ navigation }: RootTabScreenProps<"Feed">) {
	const auth = useAuth();

	const { data = [], isFetching } = useFetchTimelineQuery(auth!.authData!.userId);

	// const dispatch = useDispatch<AppDispatch>();
	// const { questions } = useSelector((state: any) => state.questions);
	// console.log(questions);

	// useEffect(() => {
	// 	dispatch(getUserTimeline(auth!.authData!.userId));
	// }, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={data as IQuestionFeed[]}
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
