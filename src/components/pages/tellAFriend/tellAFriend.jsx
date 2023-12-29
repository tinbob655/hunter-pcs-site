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
                    imgSrc='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de'
                    customHeaderClassName='alignRight' />
                </div>
            </React.Fragment>
        );
    };
};

export default TellAFriend;