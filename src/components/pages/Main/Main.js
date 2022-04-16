import { get, ref } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { database } from "../../../firebase";
import { configSliceActions } from "../../../store/config-slice";
import ConfigPanel from "../../ConfigPanel/ConfigPanel";
const Main = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const config = useSelector((state) => state.config);
    useEffect(() => {
        if (user) {
            get(ref(database, `${user.uid}/profileInfo`)).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(configSliceActions.saveConfig(snapshot.val()));
                    return;
                }
            });
        }
    }, []);
    if (!user) {
        return <Redirect to="/login" />;
    }
    if (!config) {
        return <ConfigPanel />;
    }
    return <div></div>;
};
export default Main;
