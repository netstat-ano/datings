import styles from "./ConfigWindow.module.scss";
import InputForm from "../UI/InputForm/InputForm";
const ConfigWindow = (props) => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    };
    return (
        <div className={styles.container}>
            <div className={styles.headline}>Set up your profile</div>
            <div>
                <form onSubmit={onSubmitHandler}>
                    <InputForm labelText="Name" id="name" type="text" />
                    <InputForm labelText="Surname" id="surname" type="text" />
                    <InputForm
                        labelText="Description"
                        id="description"
                        type="textarea"
                    />
                </form>
            </div>
        </div>
    );
};
export default ConfigWindow;
