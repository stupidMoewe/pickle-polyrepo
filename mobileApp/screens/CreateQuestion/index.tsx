import React from "react";
import { Input } from "../../components/Input";
import { PickleIcon } from "../../components/PickleIcon";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

export default function CreateQuestion({ navigation }: RootTabScreenProps<"CreateQuestion">) {
	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Text style={styles.title}>Create Question</Text>
				<Text style={styles.subTitle}>Create Question</Text>
				<Input placeholder="Question" style={styles.input} />
				<Input placeholder="Réponse 1" style={styles.input} />
				<Input placeholder="Réponse 1" style={styles.input} />
			</View>
		</View>
	);
}
