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
                    subheadingText='Get your bestie a discount on any of our PCs'
                    paragraphText={`Our tell a friend system is currently in development. Check back later to see if its out yet! For now you can browse some high quality
                    gaming PCs whilst your friend awaits their free discount`}
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