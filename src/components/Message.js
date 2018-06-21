import React from 'react'

const Message = ({id, subject, read, starred, labels, expanded, selectMail, selected, starMail, expandMail, body}) => {

    const Aux = props => props.children;
    const handleCheck = (e) => {
        if(typeof(selectMail) === 'function') {
            selectMail(e.target.checked)
        }
    }

    const body_html = expanded ? (
    <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
            {body ? body : 'This is the body of the message.'}
        </div>
    </div>) : null;

    return (
        <Aux>
        <div className={read ? "row message read" : "row message unread"}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" onChange={handleCheck} checked={selected}/>
                    </div>
                    <div className="col-xs-2">
                        <i className={starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={starMail}></i>
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {labels.map((label, index) => (<span className="label label-warning" key={index}>{label}</span>))}
                <a href="#" onClick={expandMail}>
                {subject}
                </a>
            </div>
        </div>

        {body_html}
        </ Aux>
    )
}

export default Message