import { FontAwesome } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, Image, RefreshControl, ScrollView, TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../../components/Button";
import { ProfileQuestionPreview } from "../../components/ProfileQuestionPreview";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAuth } from "../../context/AuthContext";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";
const profileImage = require("../../assets/images/profile-picture.jpg");

const HEADER_HEIGHT = 360;

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
	const [loading, isLoading] = useState(false);
	const { authData } = useAuth();
	const [activeBtn, setActiveBtn] = useState(0);
	const [refreshing, setRefreshing] = useState(false);
	const [positionY, setPositionY] = useState(0);
	const offset = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	const titlePublicationsBtn = `Publications ${authData?.questions.length}`;

	const onRefresh = () => {
		setRefreshing(true);
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	const headerHeight = offset.interpolate({
		inputRange: [0, HEADER_HEIGHT + insets.top],
		outputRange: [HEADER_HEIGHT + insets.top, insets.top + 200],
		extrapolate: "clamp",
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.animatedHeader, { height: headerHeight }]}>
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
				<View style={styles.headerContainer}>
					<View style={styles.usernameBox}>
						<Text style={styles.textUsername}>{authData?.username}</Text>
					</View>
					<View style={styles.userView}>
						<View style={styles.userViewElement}>
							<Text style={styles.textNumber}>123</Text>
							<Text style={styles.text}>abonnés</Text>
							<Text style={styles.textNumber}>123</Text>
							<Text style={styles.text}>abonnements</Text>
						</View>
						<View style={styles.userViewPicture}>
							<Image
								source={profileImage}
								resizeMode="cover"
								style={styles.profileImage}
							></Image>
						</View>
						<View style={styles.userViewElement}>
							<Text style={styles.textNumber}>123</Text>
							<Text style={styles.text}>réponses</Text>
							<Text style={styles.textNumber}>{authData?.likesCount || 0}</Text>
							<Text style={styles.text}>likes</Text>
						</View>
					</View>
					<View style={styles.buttonsContainer1}>
						<CustomButton
							title="Bio"
							color="pink"
							propsStyle={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
						></CustomButton>
						<CustomButton
							title="Pigeon"
							color="blue"
							propsStyle={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
						></CustomButton>
					</View>
					<View style={styles.buttonsContainer2}>
						<CustomButton
							title={titlePublicationsBtn}
							color="pink"
							isActive={activeBtn === 0}
							onPress={() => {
								setActiveBtn(0);
							}}
						></CustomButton>
						<CustomButton
							title="Commentaires"
							color="blue"
							isActive={activeBtn === 1}
							onPress={() => {
								setActiveBtn(1);
							}}
						></CustomButton>
					</View>
				</View>
			</Animated.View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
				}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
					useNativeDriver: false,
				})}
				scrollEventThrottle={16}
			>
				<View style={[styles.mainContainer, { marginTop: HEADER_HEIGHT + 50 }]}>
					{!loading &&
						activeBtn === 0 &&
						authData?.questions
							.reverse()
							.map((questionId: string, index) => (
								<ProfileQuestionPreview questionId={questionId} key={index} />
							))}
				</View>
			</ScrollView>
		</View>
	);
}
