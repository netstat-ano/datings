import { storage } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./Pictures.module.scss";
import { ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { fetchPictures } from "../../store/ui-slice";
import { useEffect, useState } from "react";
const Pictures = (props) => {
    const pictures = useSelector((state) => state.ui.pictures);
    const user = useSelector((state) => state.auth.user);
    console.log(pictures);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPictures(user.uid));
    }, []);
    const onInputChangeHandler = (event) => {
        uploadBytes(ref(storage, `${user.uid}/pictures`), event.target.files[0])
            .then(() => {
                dispatch(fetchPictures(user.uid));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div className={styles.container}>
            {pictures && <img className={styles.avatar} src={pictures}></img>}
            <div className={`${pictures ? styles.emptyhover : styles.empty}`}>
                <div className={styles.plus}>
                    <input
                        onChange={onInputChangeHandler}
                        className={styles.invisible}
                        id="avatar"
                        type="file"
                    ></input>
                    <label htmlFor="avatar">
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                </div>
            </div>
        </div>
    );
};
export default Pictures;
