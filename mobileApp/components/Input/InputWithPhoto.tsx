import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, Modal, Pressable } from "react-native";
import { ImageObject } from "../../screens/CreateQuestion";
import { TakePictureFrame } from "../TakePictureFrame";
import { View } from "../Themed";
import { Input } from "./Input";
import styles from "./styles";

const width = Dimensions.get("window").width;

interface InputWithPhotoProps {
	placeholder: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	image: ImageObject | null;
	setImageValue: React.Dispatch<React.SetStateAction<ImageObject | null>>;
}

export const InputWithPhoto = ({
	placeholder,
	value,
	setValue,
	image,
	setImageValue,
}: InputWithPhotoProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setImageValue(null);
		setIsModalOpen(true);
	};

	const closeModelWithoutSaving = () => {
		setIsModalOpen(false);
		setImageValue(null);
	};

	return (
		<View>
			<Modal visible={isModalOpen} animationType="slide">
				<>
					<TakePictureFrame image={image} setImage={setImageValue} />
					<View style={styles.topBtns}>
						<Pressable onPress={closeModelWithoutSaving}>
							<View style={styles.iconCamera}>
								<MaterialIcons name="close" size={35} color="#fff" />
							</View>
						</Pressable>
						{image && (
							<Pressable onPress={() => setIsModalOpen(false)}>
								<View style={styles.iconCamera}>
									<MaterialIcons name="arrow-forward" size={35} color="#fff" />
								</View>
							</Pressable>
						)}
					</View>
				</>
			</Modal>
			<View style={styles.inputContainer}>
				<Input
					placeholder={placeholder}
					value={value}
					onChangeText={(text) => setValue(text)}
					width={width * 0.75}
				/>
				<Pressable onPress={openModal}>
					<View style={styles.iconCamera}>
						<MaterialIcons name="photo-camera" size={35} color="#fff" />
					</View>
				</Pressable>
			</View>

			{image ? (
				<View style={styles.imageContainer}>
					<Image source={{ uri: image.uri }} style={styles.imageDisplay} />
				</View>
			) : null}
		</View>
	);
};
