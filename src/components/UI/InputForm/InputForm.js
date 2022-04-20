import AgeRangeInput from "./AgeRangeInput";
import styles from "./InputForm.module.scss";
import { useState } from "react";
const InputForm = (props) => {
    const [isError, setIsError] = useState(false);
    const onChangeHandler = (event) => {
        if (!isError) {
            props.onSaveHandler({ value: event.target.value, id: props.id });
            return;
        }
    };
    const onBlurHandler = (event) => {
        if (
            props.id === "name" ||
            props.id === "surname" ||
            props.id === "description" ||
            props.id === "school" ||
            props.id === "work"
        ) {
            if (event.target.value.trim().length < 1) {
                setIsError(`This input can't be empty`);
                return;
            }
            setIsError(false);
            return;
        }
        if (props.id === "age") {
            if (Number(event.target.value < 18)) {
                setIsError(
                    "You must have more than 18 years old to use this app"
                );
                return;
            }
            setIsError(false);
            return;
        }
    };
    if (props.type === "ageRange") {
        return <AgeRangeInput onChangeHandler={onChangeHandler} {...props} />;
    }
    return (
        <div className={styles["input-container"]}>
            <div>
                <label htmlFor={props.id}>{props.labelText}</label>
            </div>
            <div>
                {props.type !== "textarea" ? (
                    <input
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}
                        {...props.input}
                        id={props.id}
                        name={`${props.name ? props.name : ""}`}
                        type={props.type}
                    ></input>
                ) : (
                    <textarea
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}
                        {...props.input}
                        className={styles.textarea}
                        rows={props.rows}
                        cols={props.cols}
                        id={props.id}
                    ></textarea>
                )}
            </div>
            {isError && <div className={styles.error}>{isError}</div>}
        </div>
    );
};
export default InputForm;
