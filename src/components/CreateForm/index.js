import React from "react";
import {Button, TextField} from '@material-ui/core';

import axios from 'axios';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      datetime: '',
      currdatetime: new Date(),
      discussionID: '',
      datetime: new Date().toISOString().slice(0, 16)
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3001/discussions', {
        topic: this.state.topic,
        startTime: this.state.datetime,
        stagesDuration: [60000, 60000, 60000],
        currentStage: 0
        //FINISH ADDING OPTIONS
    }).then(resp => {
        console.log(resp.data.discussionID);
        this.props.updateDiscussionID(resp.data.discussionID);
        this.setState({discussionID: resp.data.discussionID});
    }).catch(error => {
        console.log(error);
    });
  }

  render() {
    return (
      <form className="create-form" onSubmit={this.handleSubmit}>
        <TextField onChange={this.handleInputChange} name="topic" id="topic" label="Discussion Topic" variant="outlined" />
        <TextField onChange={this.handleInputChange}
          name="datetime"
          id="datetime-local"
          label="Discussion Time & Date"
          type="datetime-local"
          defaultValue={this.state.datetime}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Create Discussion Link
        </Button>
      </form>
    );
  }
}

export default CreateForm;
