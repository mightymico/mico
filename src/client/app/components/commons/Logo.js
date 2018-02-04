import React, { Component} from 'react';

let logoInfo = {
  normal: {
    width: '250px',
    src: "/img/new-chatbold-logo.png"
  },
  icon:{
    width: '48px',
    src: "/img/new-chatbold-logo-icon.png"
  }
}

export default class Logo extends Component {
  render(){
    let logo = logoInfo[this.props.type]
    return(<img alt="" src={logo.src} style={{ width: logo.width }}/>);
  }
}    
Logo.defaultProps = {
  width: "200px",
  type: "normal"
}