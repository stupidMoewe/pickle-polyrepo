import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import { Camera } from "expo-camera";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { ImageObject } from "../../screens/CreateQuestion";

interface TakePictureFrameProps {
	image: ImageObject | null;
	setImage: React.Dispatch<React.SetStateAction<ImageObject | null>>;
}

interface CameraType {
	front: number;
	back: number;
}

const camStatus = Camera.Constants.Type as unknown as CameraType;

export const TakePictureFrame = ({ image, setImage }: TakePictureFrameProps) => {
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [camera, setCamera] = useState<any>();
	const [type, setType] = useState(camStatus.back);
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.granted);
		})();
	}, []);

	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync({
				type: "image/jpg",
				// quality: 0.5,
			});
			const img = {
				uri: data.uri,
				type: "image/jpg",
				name: data.uri.substr(data.uri.lastIndexOf("/") + 1),
			};
			// MediaLibrary.saveToLibraryAsync(data.uri); // to change
			setImage(img);
		}
	};

	if (hasCameraPermission === false || !isFocused) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			{image ? (
				<Image source={{ uri: image.uri }} style={styles.imageDisplay} />
			) : (
				<View style={styles.cameraContainer}>
					<Camera ref={(ref) => setCamera(ref)} type={type} style={styles.cameraFrame} />
				</View>
			)}
			<View style={styles.photoBtns}>
				<Pressable
					onPress={() => {
						setType(type === camStatus.back ? camStatus.front : camStatus.back);
					}}
				>
					<MaterialCommunityIcons
						name="camera-flip-outline"
						size={40}
						color="#fff"
					></MaterialCommunityIcons>
				</Pressable>
				<Pressable onPress={() => takePicture()}>
					<MaterialIcons name="motion-photos-on" size={60} color="#fff" />
				</Pressable>
				<Pressable>
					<Feather name="layout" size={40} color="#fff" />
				</Pressable>
			</View>
		</View>
	);
};
