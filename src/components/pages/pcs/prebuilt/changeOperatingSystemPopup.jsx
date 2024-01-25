import React, {Component} from 'react';
import {getDoc, doc, getFirestore} from 'firebase/firestore';

class ChangeOperatingSystemPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: <></>,
        };
    };

    async componentDidMount() {

        //function to get the options dropdown for the os selector
        async function getOptions() {

            let optionsHTML = [];
    
            //get operating system info from firestore
            const operatingSystems = ['windows11', 'ubuntuLinux', 'windows10', 'fedora', 'linuxMint', 'oracleLinux', 'kaliLinux'];
            const db = getFirestore();
            let operatingSystemsData = {};
    
            for (let i = 0; i < operatingSystems.length; i++) {
                let docRef = doc(db, 'operatingSystems', operatingSystems[i]);
                let docSnap = await getDoc(docRef);
                operatingSystemsData[operatingSystems[i]] = docSnap.data();
            };
    
            //now generate the HTML
            operatingSystems.forEach((operatingSystem) => {
                let thisOperatingSystemInfo = operatingSystemsData[operatingSystem];
                optionsHTML.push(
                    <React.Fragment>
                        <option name={thisOperatingSystemInfo.frontendName} selected={operatingSystem === 'windows11'}>
                            {`${thisOperatingSystemInfo.frontendName} -${thisOperatingSystemInfo.description}
                             ${thisOperatingSystemInfo.additionalCost > 0 ? `(+£${thisOperatingSystemInfo.additionalCost})` : ''}`}
                        </option>
                    </React.Fragment>
                );
            });
    
            //return the HTML
            return optionsHTML;
        };

        this.setState({options: await getOptions()});

        //show the popup
        document.getElementById('productPageOSPopupWrapper').classList.add('shown');

        //add event listener for when the form is submitted
        setTimeout(() => {
            document.getElementById('changeOperatingSystemForm').addEventListener('submit', this.changeOperatingSystemFormSubmitted);
        }, 1000);
    };

    render() {
        return(
            <React.Fragment>
                <h2>
                    Change your Operating System
                </h2>

                <div className="dividerLine"></div>

                <p>
                    All of our pre-built gaming PCs come shipped with Windows 11 pre-installed. Don't want Windows 11? You can change that right here
                </p>

                <form id="changeOperatingSystemForm">
                    <label htmlFor="selectOS">Select operating system</label>
                    <select id="selectOS" name="selectOS" required style={{maxWidth: '85%'}}>
                        {this.state.options}
                    </select>

                    <label htmlFor="submit">Submit</label>
                    <input type="submit" id="submit" name="submit" className="submit"></input>
                </form>

                <p className="legalText">
                    Please note: altering the operating system of your build may affect it's price
                </p>
            </React.Fragment>
        );
    };

    changeOperatingSystemFormSubmitted(event) {
        event.preventDefault();

        //do not need to check all entries are not null because the html has "required" attribute of the "select" element
        
        //close the popup
        document.getElementById('productPageOSPopupWrapper').classList.remove('shown');

        //save the operating system the user selected to session storage
        let customOS = event.currentTarget.selectOS.value;
        customOS = customOS.substring(0, customOS.indexOf('-')-1);  //remove everything after the '-'
        customOS = customOS.charAt(0).toLowerCase() + customOS.substring(1);    //make the first letter lowerCase
        customOS = customOS.replace(/ /g, '');  //remove all spaces from the string

        sessionStorage.setItem('customOperatingSystem', customOS);
    };
};

export default ChangeOperatingSystemPopup;