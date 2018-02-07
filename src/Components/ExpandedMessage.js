import React from "react";

class ExpandedMessage extends React.Component {

  state = { body: '' }

  async componentDidMount() {
    const message = await this.getMessage(this.props.message);
    this.expand(message.body);
  }

  async getMessage (message) {
    const id = message.id;
    const request = await fetch(`http://localhost:8082/api/messages/${id}`)
    const res = await request.json();
    return res;
  }

  expand = body => this.setState({ body })

  render () {
    return (
      <div className="row message-body" ref="kk">
       <div className="col-xs-11 col-xs-offset-1">
         {this.state.body}
       </div>
     </div>
   )
  }
}

export default ExpandedMessage;
