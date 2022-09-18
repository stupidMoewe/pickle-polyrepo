import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Animated, Image, ScrollView, TouchableHighlight } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../../components/Button";
import { ProfileQuestionPreview } from "../../components/ProfileQuestionPreview";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useGetMeQuery } from "../../store/features/auth/authApi";
import { useGetUserQuestionsQuery } from "../../store/features/feed/userFeedApi";
import { IQuestionFeed } from "../../types";
import styles from "./styles";

const profileImage = require("../../assets/images/profile-picture.jpg");

const HEADER_HEIGHT = 360;

const ProfileScreen = () => {
	const navigation = useNavigation();
	const [activeBtn, setActiveBtn] = useState(0);
	const offset = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	const { data: user, error: userError, isLoading: userLoading } = useGetMeQuery();

	const {
		data: questions,
		error,
		isLoading: questionsLoading,
	} = useGetUserQuestionsQuery(user!.id);

	if (error || questions === undefined || userError || user === undefined) {
		return (
			<View style={styles.container}>
				<Text>Error</Text>
				<Text>{error}</Text>
			</View>
		);
	}
	const questionsToDisplay = [...questions].reverse();

	const headerHeight = offset.interpolate({
		inputRange: [0, HEADER_HEIGHT + insets.top],
		outputRange: [HEADER_HEIGHT + insets.top, insets.top + 200],
		extrapolate: "clamp",
	});

	const getNbOfAnswers = (): number => {
		let nbOfAnswers: number = 0;
		questions.forEach((question) => {
			nbOfAnswers += question.answeredCount as number;
		});
		return nbOfAnswers;
	};

	const titlePublicationsBtn = `Publications ${questions.length}`;

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.animatedHeader, { height: headerHeight }]}>
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
				<View style={styles.headerContainer}>
					<View style={styles.usernameBox}>
						<Text style={styles.textUsername}>{user!.username}</Text>
					</View>
					<View style={styles.userView}>
						<View style={styles.userViewElement}>
							<Text style={styles.textNumber}>X</Text>
							<Text style={styles.text}>abonnés</Text>
							<Text style={styles.textNumber}>X</Text>
							<Text style={styles.text}>abonnements</Text>
						</View>
						<View style={styles.userViewPicture}>
							<Image
								source={
									user.imageName
										? { uri: user.imageName }
										: user.imageUrl
										? { uri: user.imageUrl }
										: profileImage
								}
								resizeMode="cover"
								style={styles.profileImage}
							></Image>
						</View>
						<View style={styles.userViewElement}>
							<Text style={styles.textNumber}>{getNbOfAnswers()}</Text>
							<Text style={styles.text}>réponses</Text>
							<Text style={styles.textNumber}>{user?.likesCount || 0}</Text>
							<Text style={styles.text}>likes</Text>
						</View>
					</View>
					{/* <View style={styles.buttonsContainer1}>
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
					</View> */}
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
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
					useNativeDriver: false,
				})}
				scrollEventThrottle={16}
			>
				<View style={[styles.mainContainer, { marginTop: HEADER_HEIGHT + 50 }]}>
					{activeBtn === 0 &&
						(questionsLoading ? (
							<Text>Loading...</Text>
						) : (
							<>
								{questionsToDisplay.map((q: IQuestionFeed, index: number) => {
									return <ProfileQuestionPreview question={q} key={index} />;
								})}
							</>
						))}
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileScreen;
