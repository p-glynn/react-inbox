import React from "react";

class ExpandedMessage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
  }


  async expand (message) {
    const id = message.id;
    const request = await fetch(`http://localhost:8082/api/messages/${id}`)
    const response = await request.json();
    this.setState({body: response.body})
  }


  componentDidMount() {
    this.body = this.expand(this.props.message)
  }

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
