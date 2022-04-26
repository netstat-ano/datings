import AgeRangeInput from "./AgeRangeInput";
import styles from "./InputForm.module.scss";
import { useState } from "react";
const InputForm = (props) => {
    const [isError, setIsError] = useState(false);
    let value = "";
    if (props.value && props.id !== "man" && props.id !== "woman") {
        value = props.value.value;
    } else if (props.value && props.value.id === props.id) {
        value = "on";
    }
    console.log(value);
    const onChangeHandler = (event) => {
        props.onSaveHandler({ value: event.target.value, id: props.id });
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
                        defaultChecked={!!value}
                        defaultValue={value}
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}
                        {...props.input}
                        id={props.id}
                        name={`${props.name ? props.name : ""}`}
                        type={props.type}
                    ></input>
                ) : (
                    <>
                        <textarea
                            maxLength={props.maxLength}
                            defaultValue={value}
                            onBlur={onBlurHandler}
                            onChange={onChangeHandler}
                            {...props.input}
                            className={styles.textarea}
                            rows={props.rows}
                            cols={props.cols}
                            id={props.id}
                        ></textarea>
                        <div>Max 600 characters</div>
                    </>
                )}
            </div>
            {isError && <div className={styles.error}>{isError}</div>}
        </div>
    );
};
export default InputForm;
