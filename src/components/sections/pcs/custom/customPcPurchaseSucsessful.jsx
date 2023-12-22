import React, {Component} from 'react';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';

//ss values are: customPcSpec address email

class CustomPcPurchaseSucsessful extends Component {

    componentDidMount() {

        //will fire when a custom pc purchase was made sucsessfully send the message to discord
        //only go once to prevent firing 2 times if the user refreshes
        if (sessionStorage.getItem('purchaseValid') === 'true') {
            sessionStorage.removeItem('purchaseValid');

            //get the purchase information
            const customPcSpec = sessionStorage.getItem('customPcSpec');
            const address = sessionStorage.getItem('address');
            const email = sessionStorage.getItem('email');
    
            //create a discord webhook session
            const request = new XMLHttpRequest();
            request.open("POST", "https://discord.com/api/webhooks/1187071870407807027/RKqIEOQhwxXsrBMmL_SCqpuIlbSZvvmn4YJ-kypWkp4aT6x289XF7GMVbItLz4-Ja9eS");
            
            //define the data being sent to the discord bot
            request.setRequestHeader('Content-Type', 'application/json');
            const messageJSON = {
                content: `New purchase of a CUSTOM PC with the following information:\n
                Custom pc spec: ${JSON.stringify(customPcSpec)}\n
                Delivery address: ${address}\n
                Email: ${email}`,
            };
            
            //send the message
            request.send(JSON.stringify(messageJSON));
        };
    };

    render() {
        return (
            <React.Fragment>
                <GenericMarkupSection
                headingText='Congratulations!'
                subheadingText='Your purchase is being processed'
                paragraphText={`We've recieved your purchase and are now processing it. We will check that the parts work together and email you
                 at ${sessionStorage.getItem('email')} with the results and our billing information.`}
                imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49dfhttps://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                leftBool={true}
                DontShowDividerLineBool={true} />
            </React.Fragment>
        );
    };
};

export default CustomPcPurchaseSucsessful;