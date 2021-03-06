import React from 'react';
import { withRouter } from 'react-router';

class NewMessage extends React.Component {

  render() {
    return (
      <div className ="new-message-form" onSubmit={(event) =>{
         event.preventDefault();
         this.props.makePost(event);
         this.props.history.push('/');
      }}>
        <form className="form-horizontal well">
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" required></input>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control" required></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary"></input>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

export default withRouter(NewMessage);
