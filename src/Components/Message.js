import React from 'react';
import {Route, Link, Switch} from "react-router-dom";
import ExpandedMessage from './ExpandedMessage';

const Message = ({message, toggleClass, simplePatch}) => {

  const isRead = message.read ? 'read' : 'unread';
  const isSelected = message.selected ? 'selected' : '';
  const isChecked = message.selected ? 'checked' : "";
  const isStarred = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'

  let id;

  return (
    <div className={`row message ${isRead} ${isSelected}`} onClick={()=>{
      let value = !message.read;
      toggleClass(message, "read");
      simplePatch(message, "read", value);
      }}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2" onClick={(e)=>{
            e.stopPropagation();
            toggleClass(message, "selected")
          }}>
          <input type="checkbox" checked={isChecked}/>
          </div>
          <div className={`col-xs-2 ${isStarred}`}  onClick={(e) => {
            e.stopPropagation();
            let value = !message.starred;
            toggleClass(message, "starred");
            simplePatch(message, "star", value)
            }}>
            <i></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((label) => <span key={message.labels.indexOf(label)} className="label label-warning">{label}</span>)}
        <Switch>
          {id = message.id}
         <Route path={`/messages/${id}`} render={ () => (
           <Link to="/">
             {message.subject}
             <ExpandedMessage message={message}/>
           </Link>
         )} />
         <Route render={ () => (
           <Link to={`/messages/${id}`}>
             {message.subject}
           </Link>
         )} />
       </Switch>
      </div>
    </div>
  )
}

export default Message;
