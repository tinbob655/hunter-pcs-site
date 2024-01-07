import React, { Component } from 'react';
import './trustpilotWidgetStyles.scss'

class TrustpilotTrustBox extends Component {
  componentDidMount() {
    this.loadTrustpilotScript();
  }

  loadTrustpilotScript() {
    const script = document.createElement('script');
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
    script.async = true;
    script.onload = this.createTrustBox;
    document.body.appendChild(script);
  }

  createTrustBox = () => {
    window.Trustpilot && window.Trustpilot.loadFromElement(document.getElementById('trustbox-container'), true);
  };

  render() {
    return (
      <div id="trustbox-container" className="trustpilot-widget" data-locale="en-GB" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="659ae1ed29de6643ad4f9d14" data-style-height="52px" data-style-width="100%">
        {/* TrustBox will be rendered inside this container */}
      </div>
    );
  }
}

export default TrustpilotTrustBox;