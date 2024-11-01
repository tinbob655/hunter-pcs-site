import React, {Component} from 'react';
import PageHeader from '../../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../../multiPageComponents/genericMarkupSection';
import AuthProvider from '../../../../context/authContext.jsx';
import Discord from '../../../../classes/discord.js';

class CustomPCPurchaseCompleted extends Component {

    static contextType = AuthProvider;

    constructor(props) {
        super(props);

        this.state = {
            authEmail: this.context?.email,
        };
    };

    componentDidMount() {

        //also update the user email
        this.setState({
            authEmail: this.context.email,
        });

        //notify discord of the purchase
        //get the necessary data for purchase notification
        const customSpecData = sessionStorage.getItem('customSpec');
        if (customSpecData) {
            const deliveryAddress = sessionStorage.getItem('deliveryAddress');
            const authUID = this.context.uid;
            const discord = new Discord();
            discord.sendMessage(`New purchase made by user with uid: ${authUID} and email address: ${this.context.email}
                The product(s) purchased: Custom PC
                The spec of the Custom PC: ${customSpecData}
                The delivery address: ${deliveryAddress}`);

            //make sure the user cannot notify discord twice
            sessionStorage.removeItem('customSpec');
        };
    };

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Purchase Completed" subheading="Your custom PC is being validated" />

                {/*congratulations section*/}
                <div>
                    <GenericMarkupSection key={this.state.authEmail}
                    heading="Well done!"
                    paragraph={`Your purchase was successful! We'll start by validating that all the parts you have chosen will work with one another. We'll keep you updated at ${this.state.authEmail} with our progress.\n\nIf you have any questions, please don't hesitate to contact us at hunterpcsuk@gmail.com`}
                    left={true}
                    imagePath="images/gamingSetupWIDE2.jpeg" />
                </div>
            </React.Fragment>
        );
    };
};

export default CustomPCPurchaseCompleted;