import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import useAxios from "../../hooks/useAxios";
import { useAppDispatch, useAppSelector } from "../../store/app/hooks";
import { answer } from "../../store/features/question/answerSlice";
import { AnswerType } from "../../types";
import { Text, View } from "../Themed";
import styles from "./styles";

interface IProps {
	answerId: string;
	questionId: string;
	isQuestionAnsweredHook: boolean;
	setIsQuestionAnsweredHook: React.Dispatch<React.SetStateAction<boolean>>;
	isAnswerChoozen: boolean;
	questionCount: number;
}

export function Answer({
	answerId,
	questionId,
	isQuestionAnsweredHook,
	setIsQuestionAnsweredHook,
	isAnswerChoozen,
	questionCount,
}: IProps) {
	const dispatch = useAppDispatch();
	const [isAnswerChoozenHook, setIsAnswerChoozenHook] = useState(isAnswerChoozen);

	const questionAnsweredHandler = () => {
		if (!isQuestionAnsweredHook) {
			dispatch(answer({ questionId, answerId }));
			setIsQuestionAnsweredHook(true);
			setIsAnswerChoozenHook(true);
		}
	};

	const [answerFetched, setAnswer] = useState<AnswerType>();
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

	return loaded ? (
		<View style={[styles.container, isQuestionAnsweredHook ? styles.questionAnswered : null]}>
			<Pressable onPress={questionAnsweredHandler}>
				<Text style={[styles.text, isAnswerChoozenHook ? styles.isAnswered : null]}>
					{answerFetched!.content}
				</Text>
				{isQuestionAnsweredHook ? (
					<Text>{answerFetched?.answeredCount / questionCount}</Text>
				) : null}
			</Pressable>
		</View>
	) : (
		<></>
	);
}
