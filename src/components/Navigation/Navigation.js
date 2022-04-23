import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
const Navigation = (props) => {
    return (
        <div className={styles.container}>
            <div>
                <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    to="/main/profile"
                >
                    My profile
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    to="/main/people"
                >
                    People
                </NavLink>
            </div>
            <div>
                <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    to="/main/chat"
                >
                    Chat
                </NavLink>
            </div>
        </div>
    );
};
export default Navigation;
