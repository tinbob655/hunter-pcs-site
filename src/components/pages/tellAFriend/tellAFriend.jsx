import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';

class TellAFriend extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Tell a Friend" subheading="Spread the good news" />

                {/*explanation of system section*/}
                <div>
                    <GenericMarkupSection
                    heading="Get your buddy a discount on any of our PCs"
                    paragraph="After purchasing one of our Gaming PCs, you will have the option to claim a discount code for your friend. When they make a purchase using this code, they will receive a 10% discount on their purchase."
                    linkText="Browse gaming PCs ⟶"
                    linkDestination="/pcsMain"
                    left={true}
                    imagePath="images/2 skulls.png" />
                </div>
            </React.Fragment>
        );
    };

    //NEED TO REMOVE EVERYWHERE THE SITE SAYS THAT THE CREATOR OF THE CODE WILL GET A PARTIAL REFUND AS THIS IS NO LONGER THE CASE
};

export default TellAFriend;