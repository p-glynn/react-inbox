import React from 'react';

const Toolbar = ({messages, count, countSelected, mark, updateLabels, del}) => {

  const checkSelected = (messages) => {
    if (count(messages, 'selected') === 0) return "fa fa-square-o"
    else if (count(messages, 'selected') < messages.length) {
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

        <button className="btn btn-default" onClick={() => {
          countSelected(messages);
        }}>
          <i className={checkSelected(messages)}></i>
        </button>

        <button className="btn btn-default" onClick={() => {
          mark(messages, true);
        }}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={() => {
          mark(messages, false);
        }}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={(e) => {
          updateLabels(messages, e.target.value, true)
        }}>
          <option value={false}>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={(e) => {
          updateLabels(messages, e.target.value, false)
        }}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={() => {
          del(messages);
        }}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar;
