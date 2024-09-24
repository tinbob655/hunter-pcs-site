import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';

class Account extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Your account" subheading="Join us" />
                
                {/*why you need an account section*/}
                <div>
                    <GenericMarkupSection
                        heading="Make your account"
                        paragraph="Create an account with us and unlock the full potential of Hunter PCs. We do not collect any of your personal information as privacy is one of our core values here."
                        left={true}
                        dividerLine={true}
                        imagePath="images/gamingSetupWIDE2.jpeg"
                        buttonText="Click here to sign up"
                        buttonAction={() => {
                            this.startLogInSignUp();
                        }} />
                </div>
            </React.Fragment>
        );
    };

    startLogInSignUp() {
        
        //method to show the login popup
    };
};

export default Account;