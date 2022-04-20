import styles from "./ConfigWindow.module.scss";
import InputForm from "../UI/InputForm/InputForm";
import GrayButton from "../UI/GrayButton/GrayButton";
import Card from "../UI/Card/Card";
import GreenButton from "../UI/GreenButton/GreenButton";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { saveConfigToDatabase } from "../../store/config-slice";
const inputReducer = (state, action) => {
    switch (action.id) {
        case "name":
            return { ...state, name: action };
        case "surname":
            return { ...state, surname: action };
        case "description":
            return { ...state, description: action };
        case "school":
            return { ...state, school: action };
        case "age":
            return { ...state, age: action };
        case "work":
            return { ...state, work: action };
        case "man":
            return { ...state, prefferedPartner: action };
        case "woman":
            return { ...state, prefferedPartner: action };
        case "ageRange":
            return { ...state, ageRange: action };
    }
};

const ConfigWindow = (props) => {
    const [inputValues, dispatchInputValues] = useReducer(inputReducer, {
        name: null,
        surname: null,
        description: null,
        school: null,
        age: null,
        work: null,
        prefferedPartner: null,
        ageRange: null,
    });
    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(saveConfigToDatabase(inputValues));
    };
    const onCancelHandler = (event) => {
        props.setIsOverlayShowed(false);
    };
    const onSaveHandler = (input) => {
        dispatchInputValues(input);
    };
    return (
        <Card className={styles.container}>
            <div className={styles.headline}>Set up your profile</div>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <div className={styles.subheadline}>
                        Tell us more about yourself
                    </div>
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Name"
                        id="name"
                        type="text"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Surname"
                        id="surname"
                        type="text"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Description"
                        id="description"
                        type="textarea"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="School"
                        id="school"
                        type="text"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Age"
                        id="age"
                        type="number"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Work"
                        type="text"
                        id="work"
                    />
                    <div className={styles.subheadline}>
                        Tell us who you are looking for
                    </div>
                    I'm interested in
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Woman"
                        type="radio"
                        id="woman"
                        name="prefferedPartner"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Man"
                        type="radio"
                        id="man"
                        name="prefferedPartner"
                    />
                    <InputForm
                        onSaveHandler={onSaveHandler}
                        labelText="Age range"
                        type="ageRange"
                        id="ageRange"
                    />
                    <div>
                        <GrayButton
                            button={{ onClick: onCancelHandler }}
                            className={styles.button}
                        >
                            Cancel
                        </GrayButton>
                        <GreenButton className={styles.button}>
                            Save
                        </GreenButton>
                    </div>
                </form>
            </div>
        </Card>
    );
};
export default ConfigWindow;
