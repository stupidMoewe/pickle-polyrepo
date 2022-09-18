import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, Modal, Pressable } from "react-native";
import { ImageObject } from "../../screens/AdvancedCreateQuestion";
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
	const [isModalViewPictureOpen, setIsModalViewPictureOpen] = useState<boolean>(false);
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
			</Modal>
			<Modal visible={isModalViewPictureOpen} animationType="slide">
				<View>
					<Image source={{ uri: image?.uri }} style={styles.imageDisplay} />
					<View style={styles.topBtns}>
						<Pressable onPress={() => setIsModalViewPictureOpen(false)}>
							<View style={styles.iconCamera}>
								<MaterialIcons name="close" size={35} color="#fff" />
							</View>
						</Pressable>
					</View>
				</View>
			</Modal>
			<View style={styles.inputContainer}>
				<Input
					placeholder={placeholder}
					value={value}
					setValue={(text: string) => setValue(text)}
					width={width * 0.75}
				/>
				<Pressable onPress={openModal}>
					<View style={styles.iconCamera}>
						<MaterialIcons name="photo-camera" size={35} color="#fff" />
					</View>
				</Pressable>
			</View>

			{image ? (
				<Pressable
					style={styles.imageContainer}
					onPress={() => setIsModalViewPictureOpen(true)}
				>
					<Image source={{ uri: image.uri }} style={styles.imageDisplay} />
				</Pressable>
			) : null}
		</View>
	);
};
