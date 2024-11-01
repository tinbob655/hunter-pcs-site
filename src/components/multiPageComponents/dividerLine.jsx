import React, {Component} from 'react'

/**
 * @param {boolean} purple true if the background is to be purple
 */

class DividerLine extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            purple: this.props.purple,
            wrapperPaddingTopBottom: '25px',
        };
    };

    render() {
        return (
            <React.Fragment>

                {/*wrapper to make sure there is not a strange colour background (this is why margins cannot be used)*/}
                <div style={{paddingTop: this.state.wrapperPaddingTopBottom, paddingBottom: this.state.wrapperPaddingTopBottom, marginLeft: 'auto', marginRight: 'auto', width: '100%', backgroundColor: this.state.purple ? '#30112c' : '#000000'}}>

                    {/*actual white bit*/}
                    <div style={{backgroundColor: 'white', width: '75%', height: '5px', marginLeft: 'auto', marginRight: 'auto'}}></div>
                </div>
            </React.Fragment>
        );
    };
};

export default DividerLine;