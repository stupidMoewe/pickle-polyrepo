import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.36:4002";

interface IProps {
	port: "4001" | "4002" | "4003" | "4004";
	url: string;
	method: Methods;
	body: Object;
	onSuccess?: (data: any) => void;
}

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const useAxios = ({ port, url, method, body, onSuccess }: IProps) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async (props = {}) => {
		try {
			setErrors(null);
			const response = await axios[method](url, { ...body, ...props });

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;
		} catch (err: any) {
			setErrors(err);
		}
	};

	return { doRequest, errors };
};

export default useAxios;
