import AgeRangeInput from "./AgeRangeInput";
import styles from "./InputForm.module.scss";
const InputForm = (props) => {
    const onChangeHandler = (event) => {
        props.onSaveHandler({ value: event.target.value, id: props.id });
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
                        onChange={onChangeHandler}
                        {...props.input}
                        id={props.id}
                        name={`${props.name ? props.name : ""}`}
                        type={props.type}
                    ></input>
                ) : (
                    <textarea
                        onChange={onChangeHandler}
                        {...props.input}
                        className={styles.textarea}
                        rows={props.rows}
                        cols={props.cols}
                        id={props.id}
                    ></textarea>
                )}
            </div>
        </div>
    );
};
export default InputForm;
