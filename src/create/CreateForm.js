import React from "react";
import {Button, TextField} from '@material-ui/core';

class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      datetime: '',
      currdatetime: new Date()
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
    console.log(this.state.topic, ", ", this.state.datetime);
  }

  render() {
    return (
      <form className="create-form" onSubmit={this.handleSubmit}>
        <TextField onChange={this.handleInputChange} name="topic" id="topic" label="Topic" variant="outlined" />
        <TextField onChange={this.handleInputChange} name="datetime"
          name="datetime"
          id="datetime-local"
          label="Discussion Time & Date"
          type="datetime-local"
          defaultValue={this.state.currdatetime
                            .toISOString()
                            .slice(0, 16)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Get Discussion Link
        </Button>
      </form>
    );
  }
}

export default CreateForm;
