import React from 'react';

export default function CustomSpecForm() {

    let optionalDefaultValues = sessionStorage.getItem('customPCFormData') ? JSON.parse(sessionStorage.getItem('customPCFormData')) : null;
    optionalDefaultValues ? optionalDefaultValues['operatingSystem'] = 'Windows 11 Home' : <></>;

    return (
        <React.Fragment>
            <h2>
                Enter your PC's custom spec
            </h2>

            <form id="customSpecForm">
                {getForm()}

                <label htmlFor="submit">Submit</label>
                <input type="submit" id="submit" name="submit" value="Submit" className="submit" style={{fontWeight: 900, paddingBottom: '2vh'}}></input>
            </form>
        </React.Fragment>
    );

    function getForm() {
        let formHTML = [];
        const pcParts = ['GPU', 'CPU', 'Memory (RAM)', 'Storage', 'Motherboard', 'Cooler(s)', 'Case', 'Power Supply', 'Operating System'];
        const backendPcParts = ['GPU', 'processor', 'memory', 'storage', 'motherboard', 'cooler', 'case', 'powerSupply', 'operatingSystem'];

        //repeat for each pc part
        pcParts.forEach((part) => {
            formHTML.push(
                <React.Fragment>
                    <p>
                        {part}:
                    </p>
                    <label htmlFor={part}>{part}</label>
                    <input type="text" id={part} name={part} style={{maxWidth: '75%'}} placeholder={part+'...'} required value={optionalDefaultValues ? optionalDefaultValues[backendPcParts[pcParts.indexOf(part)]]: null}></input>

                    <div className="dividerLine" style={{marginTop: '5vh'}}></div>
                </React.Fragment>
            );
        });

        return formHTML;
    };
};