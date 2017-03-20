class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
    }
    this.setBody = this.setBody.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  setBody(e) {
    const body = e.target.value;
    this.setState({ body })
  }

  submitComment() {
    const { onCommentSubmit } = this.props;
    onCommentSubmit(this.state.body)
    this.setState({ body: '' })
  }

  renderErrors(name) {
    return this.props.errors ?
    <p style={{color: 'red'}}>{this.props.errors[name]}</p> : null
  }

  render() {
    return(
      <div className='row'>
      <div className='col-sm-8'>
        <input
          type='text'
          className='form-control'
          style={{margin: 7}}
          onChange={this.setBody}
          value={this.state.body}
          autoFocus={true}
          autoComplete={false}
        />
        {this.renderErrors('body')}
      </div>
        <div className='col-sm-4'>
        <button
          style={{margin: 10}}
          type='button'
          className='btn btn-default btn-sm'
          onClick={this.submitComment}>Post reply</button>
      </div>
    </div>
    )
  }
}
