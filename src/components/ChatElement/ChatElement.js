import styles from "./ChatElement.module.scss";
const ChatElement = (props) => {
    console.log(props.user);
    return (
        <div className={styles.container}>
            <div>
                {props.user.img && (
                    <img className={styles.avatar} src={props.user.img}></img>
                )}
            </div>
            <div>
                {props.user.name.value} {props.user.surname.value}
            </div>
        </div>
    );
};
export default ChatElement;
