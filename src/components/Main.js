import React, {Component} from 'react';
import {connect} from 'react-redux';
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
      <div class="center">{this.props.hi}</div>
    );
  }
}
function mapStateToProps(state) {
  return {
    hi:state.runtime.hi
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