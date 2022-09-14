import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from "react-native";
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
	const [title, setTitle] = useState<string>("");
	const [answer1, setAnswer1] = useState<string>("");
	const [answer2, setAnswer2] = useState<string>("");
	const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);
	const [camera, setCamera] = useState<Camera | null>(null);

	const [imageAnswer1, setImageAnswer1] = useState<ImageObject | null>(null);
	const [imageAnswer2, setImageAnswer2] = useState<ImageObject | null>(null);
	const [imageTitle, setImageTitle] = useState<ImageObject | null>(null);

	const [focused, setFocused] = useState<number>(0);

	const [createQuestion] = useCreateQuestionMutation();

	const [uploadImage] = useUploadImageMutation();

	console.log(focused);

	const postQuestion = async () => {
		const payloadImage1 = new FormData();
		payloadImage1.append("image", imageAnswer1);
		await uploadImage(payloadImage1);
		const payloadImage2 = new FormData();
		payloadImage1.append("image", imageAnswer2);
		await uploadImage(payloadImage2);

		await createQuestion({
			title,
			answers: [answer1, answer2],
			answersImages: [imageAnswer1?.name, imageAnswer2?.name],
			// answersTypes: ["Text", "Text", answer3 ? "Text" : null, answer4 ? "Text" : null],
			// questionType: questionType || "TextText",
		})
			.unwrap()
			.then(() => {
				setTitle("");
				setAnswer1("");
				setAnswer2("");
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
		console.log("takong picture");
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
			<View style={styles.createQuestionContainer}>
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
				<Pressable
					onPress={() => takePicture()}
					style={{ position: "absolute", bottom: 40, alignSelf: "center" }}
				>
					<MaterialIcons name="motion-photos-on" size={60} color="#fff" />
				</Pressable>
			</View>
		</View>
	);
}
