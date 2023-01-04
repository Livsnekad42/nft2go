import React from 'react';
import authStore from "../stores/authStore";
import Settings from "./Settings";
import {Link, Switch, Route } from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import rmrkStore from "../stores/rmrkStore";
import MyProfile from "./MyProfile";




class Profile extends React.Component {



    togglePop = () => {
        authStore.setSeenStatus(!authStore.data.seen)
    };


    render() {
        if (!authStore.data.seen) {
    return (

        <>
            <div className="wrapper profile-wrapper">
                <Row>
                    <Col md={6}>
                        <ul>
                            <li key='data'><Link to="/profile/data">Ваши данные</Link></li>
                            <li key='settings'><Link to="/profile/settings">Ваши настройки</Link></li>
                            {!rmrkStore.rmrkWallet.wallet && <li key='wallet'><Link to="/mnemo">Создать кошелёк</Link></li>}
                        </ul>
                    </Col>
                    <Col md={6}>
                        <Switch>
                            <Route path="/profile/myprofile" component={MyProfile}/>
                            <Route path="/profile/settings" component={Settings}/>
                        </Switch>
                    </Col>
                </Row>
            </div>
        </>
    ) } else {
            return (
                <div>{this.props.children}</div>
            )
        }}
};

export default Profile;
