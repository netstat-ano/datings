import { useSelector } from "react-redux";
import Pictures from "../Pictures/Pictures";
import styles from "./Profile.module.scss";
import BlueButton from "../UI/BlueButton/BlueButton";
const Profile = (props) => {
    const config = useSelector((state) => state.config);
    const onEditProfileHandler = () => {
        props.setIsOverlayShowed(true);
    };
    return (
        <div className={styles.container}>
            <div>
                <Pictures />
            </div>
            <div className={styles.bigger}>
                {config.name.value} {config.surname.value}, {config.age.value}
            </div>
            <div className={styles.description}>{config.description.value}</div>
            <div>
                <BlueButton
                    className={styles.button}
                    button={{ onClick: onEditProfileHandler }}
                >
                    Edit profile
                </BlueButton>
            </div>
        </div>
    );
};
export default Profile;
