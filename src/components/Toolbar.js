import React, {Component} from 'react'

class Toolbar extends Component {

    render() {
        const selected = this.props.selected;
        let checkClass;
        if(selected === 'none') {
            checkClass='fa fa-square-o'
        } else if(selected === 'some') {
            checkClass='fa fa-minus-square-o'
        } else {
            checkClass='fa fa-check-square-o'
        }

        return (
            <div className="row toolbar">
                <div className="col-md-12">
                    <a class="btn btn-danger" onClick={this.props.showForm}>
                        <i class="fa fa-plus"></i>
                    </a>

                    <p className="pull-right">
                    <span className="badge badge">{this.props.numUnread}</span>
                    unread messages
                    </p>

                    <button className="btn btn-default" onClick={this.props.selectAllMail}>
                    <i className={checkClass}></i>
                    </button>

                    <button className="btn btn-default" onClick={this.props.markAsRead}>Mark As Read</button>

                    <button className="btn btn-default" onClick={this.props.markAsUnread}>Mark As Unread</button>

                    <select className="form-control label-select" onChange={this.props.addLabel}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                    </select>

                    <select className="form-control label-select" onChange={this.props.removeLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                    </select>

                    <button className="btn btn-default" onClick={this.props.deleteMessages}>
                    <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default Toolbar;