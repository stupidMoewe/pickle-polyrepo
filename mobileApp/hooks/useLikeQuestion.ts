import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.36:4002";

interface IProps {
	questionId: string;
	onSuccess?: () => void;
}

const useLikeQuestion = ({ questionId, onSuccess }: IProps) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async (props = {}) => {
		try {
			await axios["post"](`/${questionId}/like`);
			setErrors(null);

			if (onSuccess) {
				onSuccess();
			}

			return;
		} catch (err: any) {
			setErrors(err);
		}
	};

	return { doRequest, errors };
};

export default useLikeQuestion;
