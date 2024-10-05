import React, {Component} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader.jsx';
import GenericMarkupSection from '../../multiPageComponents/genericMarkupSection.jsx';
import DividerLine from '../../multiPageComponents/dividerLine.jsx';
import { Link } from 'react-router-dom';
import SmartImage from '../../multiPageComponents/smartImage.jsx';

class Support extends Component {

    render() {
        return (
            <React.Fragment>
                <PageHeader heading="Support" subheading="Ready and waiting, 24 / 7" />

                {/*no expense spared section*/}
                <div>
                    <GenericMarkupSection heading="No expense spared"
                    paragraph="Ever bought some tech only for it to not work properly? Us too and we know it can be infuriating. That's why we can guarantee that your gaming PC will be thoroughly tested for any chinks in its armour. What's more, we make sure that we only use trusted manufacturers for each of your PCs components. More on that later."
                    left={true}
                    imagePath="images/gamingSetup3.jpeg"
                    linkDestination="/pcsMain"
                    linkText="Browse our gaming PCs ⟶" />
                </div>

                <DividerLine purple={false} />

                {/*contact us section*/}
                <div className="intoPurple">
                    <GenericMarkupSection heading="Contact us anytime, anywhere"
                    paragraph="We're here for you and are dedicated to making sure that every step between now and owning a Hunter PC is plain sailing. That's why you shouldn't hesitate to contact us for any enquiries, big or small."
                    left={false}
                    buttonText="Contact us at: hunterpcsuk@gmail.com ⟶"
                    buttonAction={() => {
                        window.open('mailto:hunterpcsuk@gmail.com');
                    }}
                    imagePath="images/rounded skull 2.jpeg" />
                </div>

                <DividerLine purple={true} />

                {/*our brands section*/}
                <div className="purple">
                    <GenericMarkupSection heading="Trusted brands only"
                    paragraph="Only the best hardware makes it into a Hunter PC. Here, we know that quality is vital to performance. That's why we only ship PCs with components from trusted manufacturers like NVIDIA for GPUs, AMD for CPUs and Corsair for PSUs."
                    left={true}
                    imagePath="images/image of pc.jpeg"
                    linkDestination="/pcsMain"
                    linkText="Browse our gaming PCs ⟶" />
                </div>

                <DividerLine purple={true} />

                {/*return policy section*/}
                <div className="outOfPurple">
                    <h1 style={{marginTop: 0}}>
                        Our return policy
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        If it's our fault
                                    </h2>
                                    <p className="alignRight">
                                        Faulty parts? Short lifespan? Awful speeds? That's our fault: you can return the entire PC and we will fix it up like new for you, free of charge (minus delivery fees)
                                    </p>
                                </td>
                                <td style={{width: '3px', backgroundColor: 'white'}}></td>
                                <td>
                                    <h2 className="alignRight">
                                        If it's your fault
                                    </h2>
                                    <p className="alignLeft">
                                        Spill some water? Loose power mid update? Drop the PC? That's your fault but don't fear: we can still repair your PC for you, however you'll need to cover the cost. You will be billed for each part we replace as well as a fixed repair cost of £149.99
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <h1 style={{marginTop: '40px'}} className="noVerticalSpacing">
                        Can't work our who's fault it is?
                    </h1>
                    <a href="mailto:hunterpcsuk@gmail.com" target="_blank" className="noVerticalSpacing">
                        <h3 style={{marginTop: 0, paddingTop: 0}}>
                            Then just message us and we'll try to get you in the game as soon as possible ⟶
                        </h3>
                    </a>
                </div>

                <DividerLine purple={false} />

                {/*warranty information*/}
                <div>
                    <GenericMarkupSection heading="Warranty information"
                    paragraph="Love tinkering with a PC? Us too, so tinker to your heart's content... at your own risk. If something breaks and you removed your warranty sticker then that's on you. We can still fix it, but you'll be paying for the replacement parts."
                    left={false}
                    imagePath="images/motherboardTall.jpeg" />
                </div>

                <DividerLine purple={false} />

                {/*fraud prevention section*/}
                <div className="intoPurple">
                    <GenericMarkupSection heading="Fraud prevention"
                    paragraph="Fraud is illegal, so don't do it. We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a PC. This is to make sure that our real customers can get their PC faster, and to stop you dirty AI startups from taking everyone else's GPUs. If you don't send us images on request, then we reserve the right to revoke access to your Hunter PCs account and refuse to send you can gaming PCs. By purchasing any product from us, you agree to our fraud prevention program."
                    left={true}
                    imagePath="images/rounded skull 4.jpeg" />
                </div>

                <DividerLine purple={true} />

                {/*boring legal stuff section*/}
                <div className="purple">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Boring legal stuff
                                    </h2>
                                    <p className="alignRight">
                                        Our privacy policy and terms of service are linked below. To summarise them, we collect the minimum amount of information possible, and don't store it.
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    <Link to='/privacyPolicy'>
                                                        <h3>
                                                            Our privacy policy ⟶
                                                        </h3>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link to='/termsOfService'>
                                                        <h3>
                                                            Our terms of service ⟶
                                                        </h3>
                                                    </Link>
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </td>
                                <td style={{width: '45%'}}>
                                    <SmartImage imageClasses="mainImage" imagePath="images/gamingSetupTall3.jpeg" />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                <DividerLine purple={true} />

                {/*we deliver section*/}
                <div className="outOfPurple">
                    <GenericMarkupSection heading="We deliver"
                    paragraph="We only use the highest quality services for delivery. All Hunter PCs are delivered using DPD, one of the world's leading parcel delivery networks. At current, we only deliver to England."
                    left={true}
                    imagePath="images/gamingSetup5.jpeg"
                    linkText="Browser our gaming PCs ⟶"
                    linkDestination="/pcsMain" />
                </div>
            </React.Fragment>
        );
    };
};

export default Support;