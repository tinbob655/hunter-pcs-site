import React, {Component} from 'react';

/**@param {function} closeFunc a function which will be fired when the popup is ready to close */

class AddressPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shown: this.props.shown,
            closeFunc: this.props.closeFunc,
        };
    };

    componentDidUpdate() {

        //when the component is told to show by the parent, update state to match
        if (this.state.shown != this.props.shown) {
            this.setState({shown: this.props.shown});
        };
    };

    render() {
        return (
            <React.Fragment>
                <div className={`popupWrapper ${this.state.shown ? 'shown' : ''}`}>
                    <h1>
                        Where do you want your PC?
                    </h1>

                    {/*address form*/}
                    <form id="addressForm" onSubmit={(event) => {this.addressFormSubmitted(event)}}>
                        <p className="aboveInput">
                            Address line 1:
                        </p>
                        <input type="text" name="addressLine1" placeholder='Address line 1...' required className="popup" />

                        <p className="aboveInput" style={{marginTop: '30px'}}>
                            Address line 2:
                        </p>
                        <input type="text" name="addressLine2" placeholder='Address line 2...' required className="popup" />

                        <p className="aboveInput" style={{marginTop: '30px'}}>
                            Postcode:
                        </p>
                        <input type="text" name="postcode" placeholder="Postcode..." required className="popup" />

                        <input type="submit" className="submit" value="Submit" style={{marginTop: '30px'}} />
                    </form>
                </div>
            </React.Fragment>
        );
    };

    addressFormSubmitted(event) {

        event.preventDefault();
        const data = event.currentTarget;
        const postcode = data.postcode.value;
        const addressLine1 = data.addressLine1.value;
        const addressLine2 = data.addressLine2.value;

        //validation
        //make sure the postcode is 4-7 characters (- the space)
        let postcodeNoSpace = postcode.replace(' ', '');
        if (postcodeNoSpace.length > 7 || postcodeNoSpace.length < 4) {
            throw new Error('Invalid postcode length');
        };

        //make sure the postcode only consists of numbers and letters
        const regex = /^[A-Za-z0-9]*$/;
        if (!regex.test(postcodeNoSpace)) {
            throw new Error('Postcode may only contain numbers and letters');
        };

        //all tests were passed, save the address to the user's browser
        const addressObj = {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            postcode: postcode,
        };
        sessionStorage.setItem('deliveryAddress', JSON.stringify(addressObj));

        //close this popup
        this.state.closeFunc();
    };
};

export default AddressPopup;