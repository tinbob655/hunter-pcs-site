import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';

class About extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="About us" subheading="What we do" />

                {/*why us section*/}
                <div>
                    <GenericMarkupSection heading="Why Hunter PCs?"
                    paragraph="Because we're the best. We guarantee that all of our products are thoroughly tested. Not only that, but each and every PC we ship to you will come fully fitted with components exclusively from brands we trust such as NVIDIA, AMD and Corsair. That's the Hunter PCs no expense spared guarantee."
                    left={true}
                    buttonText="Read more on our no expense spared guarantee ⟶"
                    buttonAction={() => {

                        //button required to enable support page scrolling
                        sessionStorage.setItem('supportPageScroll', 'noExpenseSpared');
                        window.location.href = window.location.href.replace('about', 'support');
                    }}
                    imagePath="images/image of pc.jpeg" />
                </div>

                <DividerLine purple={false} />

                {/*fully customisable section*/}
                <div className="intoPurple">
                    <GenericMarkupSection heading="Fully customisable"
                    paragraph="Each and every PC you find in our prebuilt gaming PCs section can be fully customised to your heart's content. Just have a look over on our custom PCs page"
                    left={false}
                    imagePath="images/gamingSetupWIDE2.jpeg"
                    linkDestination="/custom"
                    linkText="Customise your own PC ⟶" />
                </div>

                <DividerLine purple={true} />

                {/*our socials section*/}
                <div className="purple">
                    <GenericMarkupSection heading="Our socials"
                    paragraph="We work hard to provide high quality social media posts to keep you informed, ready, and in the game. To support us, you can drop us a follow using the button below."
                    imagePath="images/gamingSetup5.jpeg"
                    buttonText="Follow us ⟶"
                    buttonAction={() => {
                        window.open('https://www.instagram.com/hunterpcsuk/?igsh=MW1yYW5sb3o0N2tvYg%3D%3D&utm_source=qr');
                    }} 
                    left={true} />
                </div>

                <DividerLine purple={true} />

                {/*get in touch section*/}
                <div className="outOfPurple">
                    <GenericMarkupSection heading="Get in touch"
                    paragraph="We're here for you: you can contact us anytime, anywhere and one of our trained support officers will respond within 5 working days. With extensive training in how to make your life easier, we pride ourselves on the quality of our customer support staff."
                    left={false}
                    buttonText="Just drop us a message at hunterpcsuk@gmail.com ⟶"
                    buttonAction={() => {
                        window.open('mailto:hunterpcsuk@gmail.com');
                    }}
                    imagePath="images/rounded skull 2.jpeg" />
                </div>

                <DividerLine purple={false} />

                {/*leave a review section*/}
                <div>
                    <GenericMarkupSection heading="Tell us what you think"
                    paragraph="Please consider leaving us a review using the below link. It helps us make sure more gamers can get their hands on a high quality gaming PC as soon as possible and gets more people in the game."
                    left={true}
                    imagePath="images/rounded skull 3.jpeg"
                    buttonText="Give us a review ⟶"
                    buttonAction={() => {
                        window.open('https://uk.trustpilot.com/review/hunterpcs.com');
                    }} />
                </div>

                <DividerLine purple={false} />

                {/*we deliver section*/}
                <div>
                    <GenericMarkupSection heading="We deliver"
                    paragraph="Not able to come and pick up your PC? Don't want to? We've got you covered. Anything you buy from us we will deliver to you at your request. If you PC gets damaged in the post, that's on us and we'll cover the cost, Its all just part of the Hunter PCs quality guarantee"
                    left={false}
                    linkDestination="/pcsMain"
                    linkText="Browse our gaming PCs ⟶"
                    imagePath="images/image of pc 2.jpeg" />
                </div>
            </React.Fragment>
        );
    };
};

export default About;