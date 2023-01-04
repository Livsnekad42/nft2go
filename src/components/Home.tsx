import React, {useEffect} from "react";
import userStore from "../stores/userStore";
import Files from "./Files";
import IdleTimer from "react-idle-timer";
import authStore from "../stores/authStore";
import {getAllTAgs} from "../requests/axiosRequests";


const Home = () => {


    useEffect(() => {
        userStore.setCurrentFolder('');
        userStore.getFolderList();
       // hui();
       // pizda();
        getAllTAgs().then(resp => console.log(resp));

    })


    function handleOnIdle (event: any) {
        console.log('user is idle1')
        setTimeout(authStore.logOut, authStore.data.logOutTime * 1000)

    }

    return (
        <div>
            <IdleTimer
                timeout={authStore.data.logOutTime}
                onIdle={handleOnIdle}
                debounce={250}
            />
            <Files />
        </div>
    )
};

export default Home;