import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { database } from "../../../firebase";
import { configSliceActions } from "../../../store/config-slice";
import ConfigPanel from "../../ConfigPanel/ConfigPanel";
import Navigation from "../../Navigation/Navigation";
import Profile from "../../Profile/Profile";
import Overlay from "../../UI/Overlay/Overlay";
import ConfigWindow from "../../ConfigWindow/ConfigWindow";
import People from "../../People/People";
import Chat from "../Chat/Chat";
import { Route } from "react-router-dom";
const Main = () => {
    const dispatch = useDispatch();
    const [isOverlayShowed, setIsOverlayShowed] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const config = useSelector((state) => state.config);
    useEffect(() => {
        if (user) {
            get(ref(database, `${user.uid}/config`)).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(configSliceActions.saveConfig(snapshot.val()));
                }
            });
        }
    }, []);
    if (!user) {
        return <Redirect to="/login" />;
    }
    if (!config) {
        return (
            <ConfigPanel
                isOverlayShowed={isOverlayShowed}
                setIsOverlayShowed={setIsOverlayShowed}
            />
        );
    }
    return (
        <div>
            <Route path="/main/profile">
                <Profile setIsOverlayShowed={setIsOverlayShowed} />
                {isOverlayShowed && (
                    <Overlay
                        children={
                            <ConfigWindow
                                setIsOverlayShowed={setIsOverlayShowed}
                            />
                        }
                    />
                )}
            </Route>
            <Route path="/main/chat">
                <Chat />
            </Route>
            <Route path="/main/people">
                <People />
            </Route>
            <Navigation />
        </div>
    );
};
export default Main;
