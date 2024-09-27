import React, {Component} from 'react';
import firebaseInstance from '../classes/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext(false);
const auth = firebaseInstance.getFirebaseAuth();

class AuthProvider extends Component {

    constructor(props) {
        super(props);

        //this will store the firebase auth state
        this.state = {
            user: null,
        };
    };

    componentDidMount() {

        //when the firebase auth state changes, update this class' state and the global context
        onAuthStateChanged(auth, (user) => {
            this.setState({
                user: user,
            });
        });
    };

    render() {
        const {children} = this.props;
        return (
            <React.Fragment>
                <AuthContext.Provider value={this.state.user}>
                    {children}
                </AuthContext.Provider>
            </React.Fragment>
        );
    };
};

export {AuthProvider}
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;