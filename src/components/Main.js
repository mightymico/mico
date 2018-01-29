import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import {getRuntimeVariableAction} from './../actions/AppActions';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fields: {}
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this)
    this.onFileRemoveHandler = this.onFileRemoveHandler.bind(this)
  }

  componentWillMount() {
    this.props.actions.getRuntimeVariable();
  }

  onSubmitHandler(evt) {
    evt.preventDefault();

    let data = new FormData();
    const files = this.state.files
    const fields = this.state.fields;
    Object.keys(files).forEach((f) => {
      const file = files[f]
      console.log(file)
      data.append('file', file)
    })
    Object.keys(fields).forEach((key) => {
      data.append(key, fields[key]);
    })

    console.log('formdata', data.entries())

    axios({
      url: '/api/email',
      method: 'post',
      data
    }).then((body) => {
      // cb(null, body.data);
      console.log('response', body.data)
    }).catch((error) => {
      // cb(error);
      console.log('error', error)
    })
  }

  onChangeHandler(evt) {
    const fields = this.state.fields;
    const newField = {...fields};
    newField[evt.target.name] = evt.target.value;
    this.setState({fields: newField});
  }

  onFileChangeHandler(evt) {
    var files;
    console.log("Inside onChangeFiles: ")
    if (evt.dataTransfer) {
      files = evt.dataTransfer.files;
      console.log("files: ", files)
    } else if (evt.target) {
      files = evt.target.files;
      console.log("files: ", files)
    }
    let state = this.state

    let filesCount = Object.keys(files).length
    console.log("files count", filesCount)

    this.setState({files: [...this.state.files, ...files]});
    this.fileInput.value = "";
  }

  onFileRemoveHandler(index) {
    console.log(index)
    let files = this.state.files.slice();
    files.splice(index, 1);
    this.setState({files});
  }

  render() {
    console.log('>>>>>>>this.state>>>>>>>>>', this.state);

    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input type="email" class="form-control" name="to" onChange={this.onChangeHandler} placeholder="To"/>
          <input type="email" class="form-control" name="cc" onChange={this.onChangeHandler} placeholder="Cc"/>
          <input type="email" class="form-control" name="bcc" onChange={this.onChangeHandler} placeholder="Bcc"/>
          <input type="text" class="form-control" name="subject" onChange={this.onChangeHandler} placeholder="subject"/>
          <input type="text" required={true} class="form-control" name="text" onChange={this.onChangeHandler} placeholder="text"/>
          <br/>
          <br/>
          {this.state.files.map((item, index)=> {
            console.log('index', index);
            return <div key={index}>
              {item.name}
              <span onClick={()=> {
                this.onFileRemoveHandler(index)
              }}>
              <i class="fa fa-times"/></span>
            </div>
          })}
          <br/>
          <input type="file" multiple name="to" onChange={this.onFileChangeHandler} ref={ref=> this.fileInput = ref}/>
          <br/>
          <button type="submit">submit</button>
        </form>
      </div>
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