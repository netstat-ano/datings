import styles from "./InputForm.module.scss";
const InputForm = (props) => {
    return (
        <div className={styles["input-container"]}>
            <div>
                <label htmlFor={props.id}>{props.labelText}</label>
            </div>
            <div>
                {props.type !== "textarea" ? (
                    <input id={props.id} type={props.type}></input>
                ) : (
                    <textarea
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
