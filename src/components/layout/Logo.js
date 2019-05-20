import React from 'react';
import '../styles/ScrambleText.css';
import ScrambleText from '../../classes/ScrambleText.js';

class Logo extends React.Component {
  state = {
    siteName: 'AppFinder'
  }

  doAnimation = () => {
    const { siteName } = this.state;
    const siteNameScrambler = new ScrambleText(this.siteNameNode, siteName);
    siteNameScrambler.scrambleText();
  }

  componentDidMount() {
    this.doAnimation();
  }

  render() {
    return (
      <div className="container">
        <div className="siteName" ref={siteNameNode => this.siteNameNode = siteNameNode}>
        </div>
      </div>
    )
  }
}

export default Logo;
