import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import { red } from "../../constants/ThemeColors";
import { ImageObject } from "../../screens/AdvancedCreateQuestion";
import { LightInput } from "../Input";
import { View } from "../Themed";
import styles from "./styles";

type InputType = "text" | "image";

interface Props {
	isActive: boolean;
	setActive: () => void;
	placeholder: string;
	value: string | null;
	setValue: (value: string | null) => void;
	boxType: "title" | "answer";
	contentType: InputType;
	setCamera: React.Dispatch<React.SetStateAction<Camera | null>>;
	image: ImageObject | null;
	setImage: React.Dispatch<React.SetStateAction<ImageObject | null>>;
	focused: number | null;
	setFocused: React.Dispatch<React.SetStateAction<number | null>>;
	number: number;
}

interface CameraType {
	front: number;
	back: number;
}

const camStatus = Camera.Constants.Type as unknown as CameraType;
const type = camStatus.back;

export const QuestionInputBox = ({
	isActive,
	setActive,
	placeholder,
	value,
	setValue,
	boxType,
	contentType,
	setCamera,
	image,
	setImage,
	focused,
	setFocused,
	number,
}: Props) => {
	const [inputSelected, setInputSelected] = React.useState<InputType | null>("image");
	const [hasCameraPermission, setHasCameraPermission] = useState(false);

	useEffect(() => {
		hasCameraPermission
			? (async () => {
					const cameraStatus = await Camera.requestCameraPermissionsAsync();
					setHasCameraPermission(cameraStatus.granted);
			  })()
			: null;
	}, []);

	return (
		<Pressable
			style={[
				styles.container,
				isActive
					? {
							borderColor: red,
					  }
					: null,
			]}
			onPress={setActive}
		>
			{image ? (
				<View style={styles.imageContainer}>
					<Image source={{ uri: image.uri }} style={styles.imageDisplay} />
				</View>
			) : (
				<>
					{inputSelected == "text" && (
						<LightInput placeholder={placeholder} setValue={setValue} />
					)}
					{inputSelected == "image" && isActive && (
						<View style={styles.cameraContainer}>
							<Camera
								ref={(ref) => {
									setCamera(ref);
									setFocused(number);
								}}
								type={type}
								style={styles.cameraFrame}
							/>
						</View>
					)}
					<View style={styles.iconsContainer}>
						{inputSelected != "text" && (
							<Pressable style={styles.icon} onPress={() => setInputSelected("text")}>
								<Ionicons name="text" color={"white"} size={30}></Ionicons>
							</Pressable>
						)}
						{inputSelected != "image" && (
							<Pressable
								style={styles.icon}
								onPress={() => {
									setInputSelected("image");
									setValue(null);
								}}
							>
								<Ionicons name="image" color={"white"} size={30}></Ionicons>
							</Pressable>
						)}
					</View>
				</>
			)}
			{image && isActive && (
				<View style={styles.trashButtonContainer}>
					<Pressable
						onPress={() => {
							setImage(null);
						}}
						style={styles.trashIcon}
					>
						<Ionicons name="trash" size={40} color="#fff" />
					</Pressable>
				</View>
			)}
		</Pressable>
	);
};
