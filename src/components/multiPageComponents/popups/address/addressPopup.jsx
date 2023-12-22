import React, {Component} from 'react';

class AddressPopup extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="fillAllFieldsPopup" style={{visibility: 'hidden', height: 0}}>
                    <h2 style={{color: 'red'}}>
                        Please fill in all the fields
                    </h2>
                </div>
                <h2>
                    Where do you want us to drop it off?
                </h2>

                <div className="dividerLine"></div>
                
                {/*ONLY IN ENGLAND SECTION*/}
                <div>
                    <h1 style={{padding: 0, color: '#c74646'}}>
                        Important:
                    </h1>
                    <p style={{maxWidth: '75%', margin: 'auto', color: '#d47979'}}>
                        At the moment, we only deliver to England, UK. If that's not you then sorry; we are working hard to expand our shipping operation. Check back later
                        for greater delivery options
                    </p>
                </div>

                <div className="dividerLine"></div>

                <form id="addressForm">
                    <p>
                        Address line 1:
                    </p>
                    <label htmlFor="addressLine1">Address line 1</label>
                    <input type="text" id="addressLine1" name="addressLine1" style={{maxWidth: '75%'}} placeholder='Address line 1...'></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>

                    <p>
                        Address line 2:
                    </p>
                    <label htmlFor="addressLine2">Address line 2</label>
                    <input type="text" id="addressLine2" name="addressLine2" style={{maxWidth: '75%'}} placeholder='Address line 2...'></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>

                    <p>
                        Town or city:
                    </p>
                    <label htmlFor="townOrCity">Town or city</label>
                    <input type="text" id="townOrCity" name="townOrCity" style={{maxWidth: '75%'}} placeholder='Town or city...'></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>

                    <p>
                        Postcode:
                    </p>
                    <label htmlFor="postcode">Postcode</label>
                    <input type="text" id="postcode" name="postcode" style={{maxWidth: '75%'}} placeholder='Postcode...'></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>

                    <p>
                        Email:
                    </p>
                    <p className="legalText">
                        If you enter the wrong email here then there is a high chance that we won't be able to process your order.
                    </p>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" style={{maxWidth: '75%'}} placeholder="Email..."></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>

                    <label htmlFor="submit">Submit</label>
                    <input type="submit" id="submit" name="submit" value="Submit" className="submit" style={{fontWeight: 900, paddingBottom: '2vh'}}></input>
                </form>
            </React.Fragment>
        );
    };
};

export default AddressPopup;