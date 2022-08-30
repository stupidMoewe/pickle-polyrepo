import { FontAwesome, Fontisto } from "@expo/vector-icons";
import React from "react";
import { Dimensions, FlatList, TouchableHighlight } from "react-native";
import Question from "../../components/Question";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAuth } from "../../context/AuthContext";
import { useFetchTimelineQuery } from "../../store/features/timelineApiSlice";
import { IQuestion, RootTabScreenProps } from "../../types";
import styles from "./style";

export default function Feed({ navigation }: RootTabScreenProps<"Feed">) {
	const auth = useAuth();

	const { data = [], isFetching } = useFetchTimelineQuery(auth!.authData!.userId);
	console.log(data);

	return (
		<View style={styles.container}>
			<FlatList
				data={data as IQuestion[]}
				renderItem={({ item }: { item: IQuestion }) => {
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
