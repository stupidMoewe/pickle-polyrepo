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
import styles from "./styles";

const profileImage = require("../../assets/images/profile-picture.jpg");

const HEADER_HEIGHT = 360;

const ProfileScreen = () => {
	const navigation = useNavigation();
	const [activeBtn, setActiveBtn] = useState(0);
	const offset = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	const { data: user, error: userError, isLoading: userLoading } = useGetMeQuery();

	const { data: questions, error, isLoading } = useGetUserQuestionsQuery(user!.id);

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

	const headerHeight = offset.interpolate({
		inputRange: [0, HEADER_HEIGHT + insets.top],
		outputRange: [HEADER_HEIGHT + insets.top, insets.top + 200],
		extrapolate: "clamp",
	});

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
							<Text style={styles.textNumber}>{user?.likesCount || 0}</Text>
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
				// refreshControl={
				// 	<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
				// }
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
					useNativeDriver: false,
				})}
				scrollEventThrottle={16}
			>
				<View style={[styles.mainContainer, { marginTop: HEADER_HEIGHT + 50 }]}>
					{!isLoading &&
						activeBtn === 0 &&
						questions &&
						questions.map((data: any, index: any) => {
							return <ProfileQuestionPreview questionId={data.id} key={index} />;
						})}
				</View>
			</ScrollView>
		</View>
	);
};

export default ProfileScreen;
