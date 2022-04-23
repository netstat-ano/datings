import { useEffect, useRef, useState } from "react";
import styles from "./InputForm.module.scss";
const AgeRangeInput = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [isError, setIsError] = useState(false);
    const [isInputValueTouched, setIsInputValueTouched] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (props.value) {
            setInputValue(props.value.value);
        }
    }, []);

    const onBlurHandler = (event) => {
        const range = inputValue.split("-") || inputValue;
        let [firstAge, secondAge] = range;
        firstAge = Number(firstAge);
        secondAge = Number(secondAge);
        console.log(firstAge);
        console.log(secondAge);
        if (firstAge < 18 || secondAge < 18 || firstAge > secondAge) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    };

    const onChangeHandler = (event) => {
        setInputValue(event.target.value);
        props.onChangeHandler(event);
        if (inputRef.current.value.length === 3 && !isInputValueTouched) {
            setIsInputValueTouched(true);
            setInputValue((prevState) => {
                const arr = [...prevState];
                arr.splice(2, 0, "-");
                const newState = arr.join("");
                return newState;
            });
            return;
        }
        if (isInputValueTouched) {
            if (inputRef.current.value.length <= 2) {
                setIsInputValueTouched(false);
            }
        }
    };
    return (
        <div className={styles["input-container"]}>
            <div>
                <label htmlFor={props.id}>{props.labelText}</label>
            </div>
            <div>
                <input
                    onBlur={onBlurHandler}
                    {...props.input}
                    ref={inputRef}
                    value={inputValue}
                    onChange={onChangeHandler}
                    id={props.id}
                    name={`${props.name ? props.name : ""}`}
                    type="text"
                ></input>
            </div>
            {isError && (
                <div className={styles.error}>
                    Remember that this app is allowed for people that have more
                    than 18 years ago. Remember also that valid age range format
                    is XX-YY
                </div>
            )}
        </div>
    );
};
export default AgeRangeInput;
