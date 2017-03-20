class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showCommentForm: false,
      buttonText: ' Comment',
      icon: <i className='fa fa-comment'></i>
    }
    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm() {
    const { buttonText, showCommentForm } = this.state;
    const icon = !showCommentForm ? <i className='fa fa-close'></i> : <i className='fa fa-comment'></i>
    const newText = !showCommentForm ? ' Close' : ' Comment'
    this.setState({showCommentForm: !this.state.showCommentForm, buttonText: newText, icon })
  }

  render() {
    const { showCommentForm } = this.state;
    const { comments } = this.props;
    const { createCommentPath } = this.props.post;
    return(
      <div>
        <div className='panel panel-default'>
          <div className='panel panel-heading'>
            <p className='panel-title'>Comments ({comments.length})</p>
          </div>
        {
          comments.map((c,i) => <CommentItem key={i} comment={c} />)
        }
        {
        showCommentForm &&
          <CommentForm
            errors={this.props.errors}
            onCommentSubmit={this.props.onSubmit}
            path={createCommentPath}
          />
        }
      </div>

        <button
          type='button'
          className='btn btn-sm pull-right'
          onClick={this.toggleShowForm}>
          {this.state.icon}{this.state.buttonText}
        </button>
    </div>
    )
  }
}
