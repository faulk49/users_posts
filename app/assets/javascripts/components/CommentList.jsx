class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCommentForm: false,
      buttonText: 'Comment',
      icon: <i className='fa fa-comment'></i>
    }
    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm() {
    const { buttonText, showCommentForm } = this.state;
    const icon = !showCommentForm ? <i className='fa fa-close'></i> : <i className='fa fa-comment'></i>
    const newText = !showCommentForm ? 'Close' : 'Comment'
    this.setState({showCommentForm: !this.state.showCommentForm, buttonText: newText, icon })
  }

  render() {
    const { showCommentForm } = this.state;
    const { comments } = this.props;
    const { createCommentPath } = this.props.post;
    return(
      <div className='col-sm-8 col-sm-offset-4'>
        <h4 className='panel-title'>Comments</h4>
        {
          comments.map((c,i) => <p key={i}>{c.body}</p>)
        }
        {
        showCommentForm && <CommentForm errors={this.props.errors} onCommentSubmit={this.props.onSubmit} path={createCommentPath} />
        }
        <button type='button' className='pull-right' onClick={this.toggleShowForm}>
          {this.state.icon}{this.state.buttonText}</button>
      </div>
    )
  }
}
