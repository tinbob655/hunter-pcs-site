import React, {Component} from 'react';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';

class TellAFriend extends Component {

    render() {
        return (
            <React.Fragment>
                {/*placeholder content until tell a friend system is operational (need more profits) */}
                <div>
                    <GenericMarkupSection
                    headingText='Tell a Friend All About Us'
                    subheadingText='Get your buddy a discount on any of our PCs'
                    paragraphText={`After purchasing one of our Gaming PCs, you will`}
                    linkContent='Browse gaming PCs ⟶'
                    linkDestination='/pcsMain'
                    DontShowDividerLineBool={true}
                    leftBool={true}
                    imgSrc='images/rounded skull 2.jpeg'
                    customHeaderClassName='alignRight' />
                </div>
            </React.Fragment>
        );
    };
};

export default TellAFriend;