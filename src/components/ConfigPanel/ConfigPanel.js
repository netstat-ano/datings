import Card from "../UI/Card/Card";
import styles from "./ConfigPanel.module.scss";
import BlueButton from "../UI/BlueButton/BlueButton";
import Overlay from "../UI/Overlay/Overlay";
import ConfigWindow from "../ConfigWindow/ConfigWindow";
import { useState } from "react";
const ConfigPanel = (props) => {
    const onButtonClickHandler = () => {
        props.setIsOverlayShowed((state) => !state);
    };
    return (
        <Card className={styles.container}>
            <div>
                You didn't config your profile yet. Config profile to use
                Datings.
            </div>
            <div>
                <BlueButton
                    button={{ onClick: onButtonClickHandler }}
                    className={styles.button}
                >
                    Config
                </BlueButton>
            </div>
            {props.isOverlayShowed && (
                <Overlay
                    children={
                        <ConfigWindow
                            setIsOverlayShowed={props.setIsOverlayShowed}
                        />
                    }
                />
            )}
        </Card>
    );
};
export default ConfigPanel;
