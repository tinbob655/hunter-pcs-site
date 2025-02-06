import React, {Component} from 'react';
import AuthProvider from '../../../../context/authContext.jsx';
import firebaseInstance from '../../../../classes/firebase.js';
import {setDoc, doc, getDoc, updateDoc, deleteField} from 'firebase/firestore';

/**
 * @param {function} closeFunc will fire when the popup is closed
 * @param {boolean} shown if the popup is visible or not
 */

class CustomSpecPopup extends Component {

    static contextType = AuthProvider;

    constructor(props) {
        super(props);

        this.state = {
            shown: this.props.shown,
            closeFunc: this.props.closeFunc,
            uid: this.context?.uid,
        };
    };

    async componentDidMount() {
        
        //set the uid
        this.setState({uid: this.context?.uid});

        //attempt to resume a previous custom PC form session if it is available in the database
        if (this.context) {
            const firestore = firebaseInstance.getFirebaseFirestore;
            const previousSession = (await getDoc(doc(firestore, 'baskets', this.context?.uid)))?.data();
            if (previousSession) {

                //set the default values in the form as the values from the previous session
                this.setState({defaultValues: previousSession.customPC});
            };
        };
    };

    componentDidUpdate() {

        //if the popup is shown or hidden, show or hide it
        if (this.props.shown != this.state.shown) {
            this.setState({shown: this.props.shown});
        };
    };

    render() {
        return (
            <div className={this.state.shown ? 'popupWrapper shown' : 'popupWrapper'}>
                <h1>
                    Your Spec
                </h1>
                <form id="customSpecForm" onSubmit={(event) => {this.customSpecFormSubmitted(event);}} onChange={(event) => {this.customPCFormUpdated(event)}}>
                    {this.getCustomSpecForm()}
                </form>
            </div>
        );
    };

    getCustomSpecForm() {

        //will generate the HTML for the custom spec form (as it is very repetitive)
        let specFormHTML = [];

        //the parts required form the user, in the form [frontendName, backendName]
        const parts = [['GPU', 'GPU'], ['CPU', 'CPU'], ['Memory (RAM)', 'memory'], ['Storage', 'storage'], ['Motherboard', 'motherboard'], ['Cooler(s)', 'cooler'], ['Case', 'case'], ['Power supply', 'powerSupply'], ['Operating System', 'operatingSystem']];

        parts.forEach((part) => {
            specFormHTML.push(
                <React.Fragment key={this.state.defaultValues}>
                    <p className="aboveInput">
                        {part[0]}:
                    </p>
                    <input type="text" name={part[1]} placeholder={`${part[0]}...`} required className="popup" defaultValue={this.state.defaultValues ? this.state.defaultValues[part[1]] : ''} />
                </React.Fragment>
            );
        });

        specFormHTML.push(
            <input type="submit" className="submit" value="Submit" />
        );

        return specFormHTML;
    };

    customSpecFormSubmitted(event) {
        event.preventDefault();

        //save the form data to sessionStorage
        const currentTarget = event.currentTarget;
        const formData = {
            GPU: currentTarget.GPU.value,
            CPU: currentTarget.CPU.value,
            memory: currentTarget.memory.value,
            storage: currentTarget.storage.value,
            motherboard: currentTarget.motherboard.value,
            cooler: currentTarget.cooler.value,
            case: currentTarget.case.value,
            powerSupply: currentTarget.powerSupply.value,
            operatingSystem: currentTarget.operatingSystem.value,
        };

        //wipe any saved custom PC from firebase
        const firestore = firebaseInstance.getFirebaseFirestore;
        updateDoc(doc(firestore, 'basket', this.state.uid), {
            customPC: deleteField(),
        }).finally(() => {
            sessionStorage.setItem('customSpec', JSON.stringify(formData));
        });

    };

    customPCFormUpdated(event) {
        event.preventDefault();

        //dave a map of the form data to firestore in case it needs to be resumed later
        const currentTarget = event.currentTarget;
        const firestore = firebaseInstance.getFirebaseFirestore;
        const formData = {
            GPU: currentTarget.GPU.value,
            CPU: currentTarget.CPU.value,
            memory: currentTarget.memory.value,
            storage: currentTarget.storage.value,
            motherboard: currentTarget.motherboard.value,
            cooler: currentTarget.cooler.value,
            case: currentTarget.case.value,
            powerSupply: currentTarget.powerSupply.value,
            operatingSystem: currentTarget.operatingSystem.value,
        };

        setDoc(doc(firestore, 'baskets', this.state.uid), {customPC: formData}, {merge: true});
    };
};

export default CustomSpecPopup;