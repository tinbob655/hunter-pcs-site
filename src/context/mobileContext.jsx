import React, {Component} from 'react';

//initialise the context with the correct value
const initialIsMobile = window.innerWidth >= window.innerHeight ? false : true;
const MobileContext = React.createContext(initialIsMobile);

class MobileProvider extends Component {

    constructor(props) {
        super(props);

        //state will store the mobile state
        this.state = {
            isMobile: initialIsMobile,
        };
    };

    componentDidMount() {
        
        //update the mobile state when the window is resized
        window.onresize = () => {
            if (window.innerWidth >= window.innerHeight) {
                this.setState({isMobile: false});
            }
            else {
                this.setState({isMobile: true});
            };
        };
    };

    render() {
        const {children} = this.props;
        return (
            <React.Fragment>
                <MobileContext.Provider value={this.state.isMobile}>
                    {children}
                </MobileContext.Provider>
            </React.Fragment>
        );
    };
};

export {MobileProvider};
export const mobileConsumer = MobileContext.Consumer;
export default MobileContext;