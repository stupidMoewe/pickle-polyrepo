import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomButton } from "../../components/Button";
import { Input } from "../../components/Input";
import { Text } from "../../components/Themed";
import { useEditProfileMutation, useGetMeQuery } from "../../store/features/auth/authApi";
import { useUploadImageMutation } from "../../store/features/feed/userFeedApi";
import gloablStyles from "../../styles";
import { ImageObject } from "../AdvancedCreateQuestion";
import styles from "./styles";

const profileImage = require("../../assets/images/profile-picture.jpg");

const Settings = () => {
	const navigation = useNavigation();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState<ImageObject | null>(null);
	const [isImageChanged, setIsImageChanged] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const { data: me } = useGetMeQuery();
	const [editProfile, { error }] = useEditProfileMutation();
	const [uploadImage, { reset }] = useUploadImageMutation();

	const editHandler = async () => {
		let imageName: string | null = null;
		if (isImageChanged) {
			const formData = new FormData();
			formData.append("image", image);
			await uploadImage(formData)
				.unwrap()
				.then((res: any) => {
					imageName = res.imageLocation;
				})
				.catch((err: any) => {
					console.log(err);
				});
			reset();
		}
		await editProfile({ username, email, imageName })
			.unwrap()
			.then(() => {
				navigation.navigate("ProfileStackNavigator");
			});
	};

	const selectImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			console.log("here");
			const img = {
				uri: result.uri,
				type: "image/jpg",
				name: result.uri.substr(result.uri.lastIndexOf("/") + 1),
			};
			setImage(img);
			setImageUrl(result.uri);
			setIsImageChanged(true);
		}
	};

	useEffect(() => {
		if (me) {
			setUsername(me.username);
			setEmail(me.email);
			me.imageUrl && setImageUrl(me.imageUrl);
		}
	}, [me, image]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={gloablStyles.pageTitle}>Settings</Text>
			<Text style={gloablStyles.h1Title}>Profile</Text>
			<ScrollView persistentScrollbar={false} style={styles.scrollContrainer}>
				<Pressable onPress={selectImage}>
					<Image
						source={
							me?.imageName
								? { uri: me.imageName }
								: me?.imageUrl
								? { uri: me.imageUrl }
								: profileImage
						}
						style={styles.profileImage}
					></Image>
				</Pressable>
				<Input
					value={username}
					setValue={setUsername}
					placeholder={"Username"}
					label={"Username :"}
				></Input>
			</ScrollView>
			<CustomButton
				title={"Save Changes"}
				color={"purple"}
				propsStyle={{ width: "50%", alignSelf: "center" }}
				onPress={editHandler}
			></CustomButton>
		</SafeAreaView>
	);
};

export default Settings;
