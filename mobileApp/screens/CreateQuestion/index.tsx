import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { CustomButton } from "../../components/Button";
import GoBack from "../../components/GoBackIcon";
import { QuestionInputBox } from "../../components/QuestionInputBox";
import { Text, View } from "../../components/Themed";
import {
	useCreateQuestionMutation,
	useUploadImageMutation,
} from "../../store/features/feed/userFeedApi";
import styles from "./styles";

export interface ImageObject {
	uri: string;
	type: string;
	name: string;
}

interface CameraType {
	front: number;
	back: number;
}

const camStatus = Camera.Constants.Type as unknown as CameraType;

export default function CreateQuestion() {
	const navigation = useNavigation();
	const [title, setTitle] = useState<string | null>(null);
	const [answer1, setAnswer1] = useState<string | null>(null);
	const [answer2, setAnswer2] = useState<string | null>(null);
	const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);
	const [camera, setCamera] = useState<Camera | null>(null);

	const [imageTitle, setImageTitle] = useState<ImageObject | null>(null);
	const [imageAnswer1, setImageAnswer1] = useState<ImageObject | null>(null);
	const [imageAnswer2, setImageAnswer2] = useState<ImageObject | null>(null);

	const [focused, setFocused] = useState<number | null>(null);

	const [createQuestion] = useCreateQuestionMutation();

	const [uploadImage, { isLoading, reset, isSuccess, error, data }] = useUploadImageMutation();

	const postQuestion = async () => {
		let titleImageName: string | null = null;
		let answer1ImageName: string | null = null;
		let answer2ImageName: string | null = null;

		if (imageTitle) {
			const titleFormData = new FormData();
			titleFormData.append("image", imageTitle);
			await uploadImage(titleFormData)
				.unwrap()
				.then((res) => {
					titleImageName = res.imageLocation;
				})
				.catch((err) => {
					console.log(err);
				});
			reset();
		}
		if (imageAnswer1) {
			const payloadImage1 = new FormData();
			payloadImage1.append("image", imageAnswer1);
			await uploadImage(payloadImage1)
				.unwrap()
				.then((res) => {
					answer1ImageName = res.imageLocation;
				})
				.catch((err) => {
					console.log(err);
				});
			reset();
		}
		if (imageAnswer2) {
			const payloadImage2 = new FormData();
			payloadImage2.append("image", imageAnswer2);
			await uploadImage(payloadImage2)
				.unwrap()
				.then((res) => {
					answer2ImageName = res.imageLocation;
				})
				.catch((err) => {
					console.log(err);
				});
			reset();
		}

		await createQuestion({
			contents: [
				title || titleImageName,
				answer1 || answer1ImageName,
				answer2 || answer2ImageName,
			],
			contentsType: [
				titleImageName ? "Image" : "Text",
				answer1ImageName ? "Image" : "Text",
				answer2ImageName ? "Image" : "Text",
			],
		})
			.unwrap()
			.then(() => {
				setTitle(null);
				setAnswer1(null);
				setAnswer2(null);
			})
			.then(() => navigation.navigate("Profile"));
	};

	const pressedHandler = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync();
			const img = {
				uri: data.uri,
				type: "image/jpg",
				name: data.uri.substr(data.uri.lastIndexOf("/") + 1),
			};
			// MediaLibrary.saveToLibraryAsync(data.uri); // to change
			switch (focused) {
				case 0:
					setImageTitle(img);
					setFocused(1);
					break;
				case 1:
					setImageAnswer1(img);
					setFocused(2);
					break;
				case 2:
					setImageAnswer2(img);
					setFocused(null);
					break;
			}
		}
	};

	Keyboard.addListener("keyboardDidShow", () => {
		setKeyboardIsOpen(true);
	});
	Keyboard.addListener("keyboardDidHide", () => {
		setKeyboardIsOpen(false);
	});

	const pausePreview = () => {
		if (camera) {
			camera.pausePreview();
		}
	};
	pausePreview();

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<GoBack />
				<Text style={styles.title}>Post a Question</Text>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
				style={[styles.containerQuestions, { bottom: keyboardIsOpen ? 0 : 0 }]}
			>
				<View
					style={{
						flexDirection: "row",
						flex: 1,
					}}
				>
					<QuestionInputBox
						isActive={focused === 0}
						setActive={() => setFocused(0)}
						placeholder={"Title"}
						value={title}
						setValue={setTitle}
						boxType={"title"}
						contentType={"text"}
						setCamera={setCamera}
						image={imageTitle}
						setImage={setImageTitle}
						focused={focused}
						setFocused={setFocused}
						number={0}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						flex: 1,
					}}
				>
					<QuestionInputBox
						isActive={focused === 1}
						setActive={() => setFocused(1)}
						placeholder={"Answer 1"}
						value={answer1}
						setValue={setAnswer1}
						boxType={"answer"}
						contentType={"text"}
						setCamera={setCamera}
						image={imageAnswer1}
						setImage={setImageAnswer1}
						focused={focused}
						setFocused={setFocused}
						number={1}
					/>
					<QuestionInputBox
						isActive={focused === 2}
						setActive={() => setFocused(2)}
						placeholder={"Answer 2"}
						value={answer2}
						setValue={setAnswer2}
						boxType={"answer"}
						contentType={"text"}
						setCamera={setCamera}
						image={imageAnswer2}
						setImage={setImageAnswer2}
						focused={focused}
						setFocused={setFocused}
						number={2}
					/>
				</View>
			</KeyboardAvoidingView>
			{(imageTitle || title) && (imageAnswer1 || answer1) && (imageAnswer2 || answer2) ? (
				<CustomButton
					title={"post"}
					propsStyle={{ position: "absolute", bottom: 40, alignSelf: "center" }}
					color={"pink"}
					onPress={postQuestion}
				></CustomButton>
			) : (
				<Pressable
					onPress={() => takePicture()}
					style={{ position: "absolute", bottom: 35, alignSelf: "center" }}
				>
					<MaterialIcons name="motion-photos-on" size={70} color="#fff" />
				</Pressable>
			)}
		</View>
	);
}
