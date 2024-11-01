import React, {Component} from 'react';

/**
 * @param {function} closeFunc will fire when the popup is closed
 * @param {boolean} shown if the popup is visible or not
 */

class CustomSpecPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shown: this.props.shown,
            closeFunc: this.props.closeFunc,
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
                <form id="customSpecForm" onSubmit={(event) => {this.customSpecFormSubmitted(event);}}>
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
                <React.Fragment>
                    <p className="aboveInput">
                        {part[0]}:
                    </p>
                    <input type="text" name={part[1]} placeholder={`${part[0]}...`} required className="popup" />
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

        //dave the form data to sessionStorage
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

        sessionStorage.setItem('customSpec', JSON.stringify(formData));

        this.state.closeFunc();
    };
};

export default CustomSpecPopup;