import React, {Component} from 'react';
import './supportStyles.scss';

class Support extends Component {

    componentDidMount() {
        const scrollTarget = document.getElementById(sessionStorage.getItem('supportPageScroll'));
        if (scrollTarget) {
            setTimeout(() => {
                scrollTarget.scrollIntoView(true);
            }, 1000);
        };
        sessionStorage.setItem('supportPageScroll', undefined);
    }

    render() {
        //NEED TO MAKE PAGE SCROLL AUTOMATICALLY BASED ON SESSIONSTORAGE.GETITEM(supportPageScroll)
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Support is here 24/7
                </h1>

                {/*NO EXPENSES SPARED SECTION*/}
                <div id="noExpensesSpared">
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetup3.jpeg?alt=media&token=14f48700-0317-41ad-8a46-723bdc52bc5c'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignRight">
                                        We guarantee no expenses spared
                                    </h2>
                                    <p className="alignLeft" style={{maxWidth: '85%'}}>
                                        Ever bought some tech only for it not to work? We have and we know it can be infuriating. That's why we can promise you that your
                                        gaming pc will be thoroughly tested for any chinks its armour. What's more, we make sure that we only use trusted manufacturers
                                        for each of the components in your pc. More on that later
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*CONTACT US SECTION*/ }
                <div id="contactUs">
                    <h1 className="alignRight">
                        Contact us any time, anywhere
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignLeft">
                                        We're here for you
                                    </h2>
                                    <p className="alignRight">
                                        We're dedicated to making sure that every step of the way between being here and owning a Hunter Pc is smooth sailing. That's why
                                        you shouldn't hesitate to contact us
                                    </p>
                                    <a href="mailto:HunterPcsSupport@gmail.com" target="_blank">
                                        <h3 className="limitedSize">
                                            Contact us at: hunterPcsSupport@gmail.com
                                        </h3>
                                    </a>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%202.jpeg?alt=media&token=c9e0128f-15ca-4595-bc92-15618109e0de'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*BRANDS WE USE SECTION*/}
                <div id="brandsWeUse" className="purpleGrey">
                    <h1 className="alignLeft">
                        Only the best in a Hunter Pc
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Fimage%20of%20pc.jpeg?alt=media&token=057583b8-036a-4ffd-9657-58e010d7e8e8' 
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Trusted brands only
                                    </h2>
                                    <p className="alignLeft">
                                        Here at Hunter Pcs, we know that quality is vital to high-performance pcs like ours. That's why we only ship pcs them with components
                                        from trusted manufacturers you can trust, like these:
                                    </p>
                                    <p className="alignLeft">
                                        -AMD and Intel for CPUs 
                                    </p>
                                    <p className="alignLeft">
                                        -NVIDIA for GPUs 
                                    </p>
                                    <p className="alignLeft">
                                        -Corsair and thermaltake for power supply units
                                    </p>
                                    <p className="alignLeft">
                                        -Kingston and Crucial for SSDs
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*RETURNS SECTION*/}
                <div id="returns">
                    <h1>
                        Our return policy
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td style={{borderRight: '5px white solid'}}>
                                    <h2 className="alignRight">
                                        If its our fault
                                    </h2>
                                </td>

                                <td>
                                    <h2 className="alignLeft">
                                        If its your fault
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td style={{borderRight: '5px white solid'}}>
                                    <p className="alignLeft">
                                        Faulty parts? Limited lifespan? Slow speeds? That's our fault: you can return the entire pc and we will fix it up like new 
                                        for you free of charge (minus delivery fees)
                                    </p>
                                </td>
                                <td>
                                    <p className="alignRight">
                                        Spill some water? Loose power mid update? Drop the pc? Thats your fault but don't fear: we can still repair your pc for you 
                                        but you'll need to cover the cost. You will be billed for each part we replace as well as a fixed cost of £149.99 for the repairs
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                    <a href="mailto:HunterPcsSupport@gmail.com" target="_blank">
                        <h2>
                            Can't work out who's fault it is?
                        </h2>
                        <h3 className="limitedSize">
                            Then just message us here and we'll have a chat about what we can do to get you back in the game as soon as possible
                        </h3>
                    </a>
                </div>

                {/*WARRANTY INFORMATION SECTION*/}
                <div id="warrantyInformation">
                    <h1 className="alignRight">
                        Warranty Information
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td style={{width: '40%'}}>
                                    <h2 className="alignLeft">
                                        Tinker to your heart's content
                                    </h2>
                                    <p className="alignRight">
                                        Love tinkering with a pc? Us too: you can tinker and edit your pc all you want, however do so at your own risk 
                                        <br/><br/>
                                        If something breaks, thats on you. We can still fix it, but you'll be paying for the replacement parts
                                    </p>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FmotherboardTall.jpeg?alt=media&token=1e13e531-cf90-4a64-953f-84e850755064'
                                    className="centered mainImage" style={{width: '85%', maxHeight: '400px', objectFit: 'cover'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*FRAUD PREVENTION SECTION*/}
                <div className="purpleGrey" id="fraudPrevention">
                    <h1 className="alignLeft">
                        Fraud Prevention
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2Frounded%20skull%204.jpeg?alt=media&token=fc2925fe-3d55-47ca-adc8-42bcf4a8b025'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                                <td>
                                    <h2 className="alignRight">
                                        Fraud is illegal, don't do it
                                    </h2>
                                    <p className="alignLeft">
                                        We HATE fraud, so we may request to see any customer's photo id as well as an image of the bank card used to purchase a pc. This is to 
                                        make sure that our real customers can get their pc faster, and to stop you dirty AI startups taking everyone else's GPUs
                                        <br/><br/>
                                        If you don't send us images on reuest then we may revoke access to your HunterPcs account and refuse to send you any gaming pcs
                                        <br/><br/>
                                        By purchasing any product from HunterPcs, you agree to our fraud prevention program
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*PRIVACY POLICY and TERMS OF SERVICE*/}
                <div>
                    <h1 className="alignRight">
                        Boring legal stuff
                    </h1>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <div id="privacyPolicy">
                                        <h2 className="alignLeft">
                                            Privacy policy
                                        </h2>
                                        <p className="alignRight legalText">
                                            ENTER_PRIVACY_POLICY_HERE
                                        </p>
                                    </div>
                                    
                                    <div id="termsOfService" style={{borderTop: '5px solid white'}}>
                                        <h2 className="alignLeft">
                                            Terms of service
                                        </h2>
                                        <p className="alignRight legalText">
                                            ENTER_TERMS_OF_SERVICE_HERE
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupTall3.jpeg?alt=media&token=2aa1cc21-dfdf-44aa-b228-e1de4cc45337'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };
};

export default Support;