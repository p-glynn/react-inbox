import React from 'react';

const NewMessage = ({hidden, toggleHidden}) => {

  const isHidden = hidden ? "hidden" : ""

  return (
    <div className ={`new-message-form ${isHidden}`} >
      <form className="form-horizontal well">
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"></input>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2" onClick={(e)=> {
            e.preventDefault();
            let requestBody = {}
            requestBody["subject"] = document.getElementById("subject").value;
            requestBody["body"] = document.getElementById("body").value;
            fetch ('http://localhost:8082/api/messages/', {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
             }
           }) // changes are happening here in the server but aren't being reflected properly on the front-end :(
            toggleHidden();
          }}>
            <input type="submit" value="Send" className="btn btn-primary"></input>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewMessage;
