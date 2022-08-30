import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import useAxios from "../../hooks/useAxios";
import { AnswerType } from "../../types";
import styles from "./styles";

export function AnswerBntText({ answerId }: any) {
	const [answer, setAnswer] = useState<AnswerType>();
	const [loaded, setLoaded] = useState(false);

	const { doRequest: doRequestAnswer, errors } = useAxios({
		port: "4002",
		url: `/answers/${answerId}`,
		method: "get",
		body: {},
		onSuccess: (data) => {
			setAnswer(data);
			setLoaded(true);
		},
	});

	useEffect(() => {
		doRequestAnswer();
		if (errors) {
			console.log("errors", errors);
		}
	}, []);

	const onPressedHandler = () => {
		console.log("onPressedHandler");
	};

	return loaded ? (
		<View>
			<TouchableOpacity onPress={onPressedHandler} style={styles.container}>
				<Text style={styles.text}>{answer!.content}</Text>
			</TouchableOpacity>
		</View>
	) : (
		<></>
	);
}
