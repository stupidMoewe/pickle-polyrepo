import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, TouchableHighlight } from "react-native";
import { CustomButton } from "../../components/Button";
import { ProfileQuestionPreview } from "../../components/ProfileQuestionPreview";
import { Text, View } from "../../components/Themed";
import { pinkPickle } from "../../constants/ThemeColors";
import { useAuth } from "../../context/AuthContext";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";
const profileImage = require("../../assets/images/profile-picture.jpg");

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
	const [loading, isLoading] = useState(false);
	const auth = useAuth();

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<View style={styles.headerContainer}>
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
							<Text style={styles.textNumber}>123</Text>
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
						<CustomButton title="Publications" color="pink"></CustomButton>
						<CustomButton title="Commentaires" color="blue"></CustomButton>
					</View>
				</View>
				<View style={styles.mainContainer}>
					{!loading &&
						auth?.authData?.questions.map((questionId: string, index) => (
							<ProfileQuestionPreview questionId={questionId} key={index} />
						))}
				</View>
			</ScrollView>
		</View>
	);
}
