import React from 'react';

const Toolbar = ({messages, count, countSelected, mark, updateLabels, multiPatch, hidden, toggleHidden}) => {

  const isDisabled = (count(messages, 'selected') === 0) ? 'disabled' : '';

  const selectButton = (messages) => {
    if (count(messages, 'selected') === 0) {
      return "fa fa-square-o"
    } else if (count(messages, 'selected') < messages.length) {
      return "fa fa-minus-square-o"
    } else {
      return "fa fa-check-square-o"
    }
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{messages.length - count(messages, "read")}</span>
          unread messages
        </p>

        <a className="btn btn-danger" onClick={() => {toggleHidden(hidden)}}>
          <i className="fa fa-plus"></i>
        </a>

        <button className="btn btn-default" onClick={() => {
          countSelected(messages);
        }}>
          <i className={selectButton(messages)}></i>
        </button>

        <button className="btn btn-default" disabled={isDisabled} onClick={() => {
          mark(messages, true);
          multiPatch(messages, "read", true)
        }}>
          Mark As Read
        </button>

        <button className="btn btn-default" disabled={isDisabled} onClick={() => {
          mark(messages, false);
          multiPatch(messages, "read", false)
        }}>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={isDisabled} onChange={(e) => {
          updateLabels(messages, e.target.value, true)
          multiPatch(messages, "addLabel", e.target.value);
        }}>
          <option value={false}>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={isDisabled} onChange={(e) => {
          updateLabels(messages, e.target.value, false);
          multiPatch(messages, "removeLabel", e.target.value);
        }}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" disabled={isDisabled} onClick={() => {
          multiPatch(messages, "delete")
        }}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar;
