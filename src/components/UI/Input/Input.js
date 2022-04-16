import styles from "./Input.module.scss";
const Input = (props) => {
    return (
        <div className={styles.container}>
            <input className={styles.input} {...props.input}></input>
        </div>
    );
};
export default Input;
