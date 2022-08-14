import React, { useEffect, useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export function TakePictureFrame() {
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [camera, setCamera] = useState<any>();
	const [image, setImage] = useState();
	const [type, setType] = useState(Camera.Constants.Type.back);
	const isFocused = useIsFocused();

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.granted);
		})();
	}, []);
	const takePicture = async () => {
		if (camera) {
			const data = await camera.takePictureAsync(null);
			console.log(data.uri);
			MediaLibrary.saveToLibraryAsync(data.uri);
			setImage(data.uri);
		}
	};
	console.log(image);

	if (hasCameraPermission === false || !isFocused) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			{image ? (
				<Image source={{ uri: image }} style={styles.imageDisplay} />
			) : (
				<View style={styles.cameraContainer}>
					<Camera ref={(ref) => setCamera(ref)} type={type} style={styles.cameraFrame} />
				</View>
			)}
			<View style={styles.photoBtns}>
				<Pressable
					onPress={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
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
}
