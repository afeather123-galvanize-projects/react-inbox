import React, {Component} from 'react'

class ComposeForm extends Component {
    state = {
        subject: '',
        body: ''
    }

    render() {
        const onSubmit = (e) => {
            e.preventDefault()
            this.props.handleSubmit(this.state)
        }
        return (
            <form class="form-horizontal well" onSubmit={onSubmit}>
                <div class="form-group">
                    <div class="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div class="form-group">
                    <label for="subject" class="col-sm-2 control-label">Subject</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="subject" placeholder="Enter a subject" name="subject" 
                        onChange={(e)=>{this.setState({subject: e.target.value})}}
                        value={this.state.subject}/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="body" class="col-sm-2 control-label">Body</label>
                    <div class="col-sm-8">
                        <textarea name="body" id="body" class="form-control" 
                        onChange={(e)=>{this.setState({body: e.target.value})}}>{this.state.body}</textarea>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" class="btn btn-primary" />
                    </div>
                </div>
            </form>
        )
    }
}

export default ComposeForm