import ReactDOM from "react-dom";
import styles from "./Overlay.module.scss";
const OverlayContent = (props) => {
    return <div className={styles.overlay}>{props.children}</div>;
};
const Overlay = (props) =>
    ReactDOM.createPortal(
        <OverlayContent children={props.children} />,
        document.getElementById("root-overlay")
    );
export default Overlay;
