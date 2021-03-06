import styles from "./Person.module.scss";
import profileStyles from "../Profile/Profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBan } from "@fortawesome/free-solid-svg-icons";
import Card from "../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { ref, update, get } from "firebase/database";
import { database } from "../../firebase";
import { peopleSliceActions } from "../../store/people-slice";
const checkMatch = (firstUser, secondUser) => {
    get(ref(database, `${secondUser.uid}`)).then((snapshot) => {
        const response = snapshot.val();
        console.log(response);
        for (const uid in response.liked) {
            if (uid === firstUser.uid) {
                const updates = {};
                updates[`${firstUser.uid}/matched/${secondUser.uid}`] =
                    secondUser;
                updates[`${secondUser.uid}/matched/${firstUser.uid}`] =
                    firstUser;
                update(ref(database), updates);
            }
        }
    });
};
const Person = (props) => {
    const user = useSelector((state) => state.auth.user);
    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const onHeartClickHandler = (event) => {
        const updates = {};
        updates[`${user.uid}/liked/${props.person.uid}`] = props.person;
        console.log(user);
        checkMatch(config, props.person);
        update(ref(database), updates);
        dispatch(peopleSliceActions.removePerson(props.person.uid));
    };
    const onBanHandler = () => {
        const updates = {};
        updates[`${user.uid}/banned/${props.person.uid}`] = props.person;
        update(ref(database), updates);
        dispatch(peopleSliceActions.removePerson(props.person.uid));
    };
    return (
        <Card className={styles.container}>
            <div className={styles.icon}>
                <span onClick={onBanHandler}>
                    <FontAwesomeIcon icon={faBan} />
                </span>
            </div>
            <div>
                <div>
                    {props.person.img && (
                        <img
                            className={styles.avatar}
                            src={props.person.img}
                        ></img>
                    )}
                </div>
                <div className={profileStyles.bigger}>
                    {props.person.name.value} {props.person.surname.value}
                    {", "}
                    {props.person.age.value}
                </div>
                <div className={profileStyles.description}>
                    {props.person.description.value}
                </div>
            </div>
            <div className={`${styles.icon} ${styles.heart}`}>
                <span onClick={onHeartClickHandler}>
                    <FontAwesomeIcon icon={faHeart} />
                </span>
            </div>
        </Card>
    );
};
export default Person;
