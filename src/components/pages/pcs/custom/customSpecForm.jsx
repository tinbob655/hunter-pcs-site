import React, {Component} from 'react';

class CustomSpecForm extends Component {

    render() {
        return (
            <React.Fragment>
                <h2>
                    Enter your PC's custom spec
                </h2>
                <div style={{visibility: 'hidden', height: 0}} id="customPcFormFillAllFieldsPopup">
                    <h2 style={{color: 'red'}}>
                        Please fil in all the fields
                    </h2>
                </div>

                <form id="customSpecForm">
                    {this.getForm()}

                    <label htmlFor="submit">Submit</label>
                    <input type="submit" id="submit" name="submit" value="Submit" className="submit" style={{fontWeight: 900, paddingBottom: '2vh'}}></input>
                </form>
            </React.Fragment>
        );
    };

    getForm() {
        let formHTML = [];
        const pcParts = ['GPU', 'CPU', 'Memory (RAM)', 'Storage', 'Motherboard', 'Cooler(s)', 'Case', 'Power Supply', 'Operating System'];

        //repeat for each pc part
        pcParts.forEach((part) => {
            formHTML.push(
                <React.Fragment>
                    <p>
                        {part}:
                    </p>
                    <label htmlFor={part}>{part}</label>
                    <input type="text" id={part} name={part} style={{maxWidth: '75%'}} placeholder={part+'...'}></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>
                </React.Fragment>
            );
        });

        return formHTML;
    };
};

export default CustomSpecForm;