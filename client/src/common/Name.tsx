import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

export const NameInput: React.FC = () => {
    const { userName, setUserName } = useContext(UserContext);
    // take name from params ?username 
    const { username } = useParams();

    useEffect(() => {
        console.log(username);
        if (username)
            setUserName(username);

    }, [username, setUserName]);


    return (
        <input
            className="border  rounded-md p-2 h-10 my-2 w-full"
            placeholder="Enter your name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
        />
    );
};
