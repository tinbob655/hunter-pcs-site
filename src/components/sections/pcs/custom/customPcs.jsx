import React, {Component} from 'react';
import './customPcsStyles.scss';
import {getPartsList} from 'pcpartpickerparser';

class CustomPcs extends Component {

    render() {
        return (
            <React.Fragment>
                <h1 className="alignRight">
                    Design your custom pc
                </h1>
                
                {/*DESCRIPTION SECTION*/}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <h2 className="alignLeft">
                                        Build your dreams
                                    </h2>
                                    <p className="alignRight">
                                        Below is the hunter pcs cutsom pc designer, so you can create your own custom rig with ease. We'll build it and ship it to you as 
                                        usual
                                    </p>
                                    <button type="button" onClick={function() {document.getElementById('customPcDesignerWrapper').scrollIntoView(true)}}>
                                        <h3>
                                            Get started!
                                        </h3>
                                    </button>
                                </td>
                                <td>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/hunter-pcs-firebase.appspot.com/o/images%2FgamingSetupWIDE2.jpeg?alt=media&token=f45440e7-bb17-4e56-9213-6bb178ed49df'
                                    className="mainImage centered" style={{width: '85%'}} alt="loading..." />
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/*CUSTOM PC DESIGNER*/}
                <div id="customPcDesignerWrapper">
                    <table>
                        <thead>
                            {this.getCustomPcDesigner()}
                        </thead>
                    </table>
                </div>
            </React.Fragment>
        );
    };

    getCustomPcDesigner() {
        //function to allow a user to open the selector menu for a specific pc component
        function openPartSelector(part) {
            console.log();
        };

        let customPcDesignerHTML = [];
        const pcComponents = ['CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Cooler', 'Case', 'Power Supply'];

        //repeat for every component (part) required
        pcComponents.forEach((part) => {
            customPcDesignerHTML.push(
                <React.Fragment>
                    <tr>
                        {/*part name and row header*/}
                        <td>
                            <h2>
                                {part}
                            </h2>
                        </td>

                        {/*button to open selector*/}
                        <td>
                            <button type="button" onClick={function() {openPartSelector(part)}}>
                                <p>
                                    Select {" "+part}
                                </p>
                            </button>
                        </td>

                        {/*product image (shows after selected)*/}
                        <td>
                            <img src='a'
                            className="productImage centered" alt="loading..." />
                        </td>
                    </tr>
                </React.Fragment>
            );
        });
    };
};

export default CustomPcs;