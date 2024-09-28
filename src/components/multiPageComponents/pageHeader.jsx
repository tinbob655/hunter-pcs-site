import React, {Component} from 'react';

class PageHeader extends Component {

    constructor(props) {
        super(props);

        //state will inherit props from parent
        this.state = {
            heading: this.props.heading,
            subheading: this.props.subheading,
        };
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="alignLeft noVerticalSpacing" style={{marginLeft: '12.5%'}}>
                    {this.state.heading}
                </h1>
                <p className="alignLeft noVerticalSpacing" style={{marginLeft: '17%', color: '#c5abbe'}}>
                    {this.state.subheading}
                </p>
                <div className="dividerLine"></div>
            </React.Fragment>
        );
    };
};

export default PageHeader;