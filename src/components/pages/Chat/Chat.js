import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { database } from "../../../firebase";
import ChatElement from "../../ChatElement/ChatElement";
const Chat = (props) => {
    const config = useSelector((state) => state.config);
    const [chats, setChats] = useState([]);
    console.log(chats);
    useEffect(() => {
        get(ref(database, `${config.uid}/matched`)).then((snapshot) => {
            const response = snapshot.val();
            for (const id in response) {
                setChats((prevState) => {
                    return [...prevState, response[id]];
                });
            }
        });
    }, []);
    return (
        <div>
            {chats.map((user) => {
                return <ChatElement user={user}></ChatElement>;
            })}
        </div>
    );
};
export default Chat;
