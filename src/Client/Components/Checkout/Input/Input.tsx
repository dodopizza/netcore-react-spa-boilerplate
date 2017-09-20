import * as React from "react";
import "./Input.scss";

export default (onInput: () => void) => {
	return (
		<input className="input" onInput={onInput} />
	);
}