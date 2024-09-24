import React, {Component} from 'react';
import AutoNav from '../../multiPageComponents/autoNav.jsx';

class Home extends Component {

    constructor(props) {
        super(props);

        //setup state
        this.state = {
            temporaryNav: <React.Fragment></React.Fragment>,
        };
    };

    componentDidMount() {

        //temporary for development of other pages before the home page. When the user goes here, redirect them
        this.setState({
            temporaryNav: <AutoNav destination="/account" />,
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.temporaryNav}
            </React.Fragment>
        );
    };
};

export default Home;