import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getRuntimeVariableAction} from './../actions/AppActions';


class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getRuntimeVariable();
  }

  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

Main.propTypes = {
  message: PropTypes.string,
  actions: PropTypes.shape({
    getRuntimeVariable: PropTypes.func
  })
}
function mapStateToProps(state) {
  return {
    message: state.runtime.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getRuntimeVariable: ()=>(dispatch(getRuntimeVariableAction()))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);