import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAuth } from "../../context/AuthContext";
import { useFetchTimelineQuery } from "../../store/features/timelineApiSlice";
import { IQuestionFeed } from "../../types";
import styles from "./style";

export default function Feed() {
	const auth = useAuth();
	const navigation = useNavigation();

	const { data = [], isFetching } = useFetchTimelineQuery(auth!.authData!.userId);

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
