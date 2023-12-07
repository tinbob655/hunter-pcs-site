import React, {Component} from 'react';

import LoginPopup from './loginPopup';

class Account extends Component {

    state = {
        popup: null,
    };
    

    render() {
        return (
            <React.Fragment>

                {/*if the user is not logged in, make them log in to access the page*/}
                <div>
                    {sessionStorage.getItem('loggedIn') == true ? <></> : <LoginPopup/>}
                </div>
                <h1 className="alignRight">
                    Your account
                </h1>

                {/*recent purchases*/}
                {/*needs bakset and checkout sections working*/}
            </React.Fragment>
        );
    };
};

export default Account;