import React, {Component} from 'react';
import {connect} from 'react-redux';

import { startupAction } from '../actions/AuthAction';
var Loader = require('halogen/DotLoader');

class Application extends Component {
  constructor(props){
    super(props)
    this.props.onStart()
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.isAuthenticated){
      window.location.assign('/login')
    }
  }
  
  render(){
    if(this.props.startup || this.props.refresh){
      return (<div style={{
        width: '100%'
      }}><div style={{"position":"absolute","top":"50%","left":"50%","transform":"translate(-50%, -50%)","MsTransform":"translate(-50%, -50%)","WebkitTransform":"translate(-50%, -50%)"}}><Loader color="#4DAF7C" /></div></div>)
    }
    return (<div>{this.props.children}</div>);
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentApplication: state.auth.currentApplication,
    refresh: state.auth.refresh,
    startup: state.auth.startup
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    onStart: ()=> {
      dispatch(startupAction())
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Application);