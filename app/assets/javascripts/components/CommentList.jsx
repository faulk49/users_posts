class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: props.post.comments || [],
      showCommentForm: false,
      buttonText: 'Comment'
    }
    this.toggleShowForm = this.toggleShowForm.bind(this);
  }

  toggleShowForm() {
    const { buttonText } = this.state;
    const newText = buttonText === 'Comment' ? 'Close' : 'Comment'
    this.setState({showCommentForm: !this.state.showCommentForm, buttonText: newText })
  }
  
  render() {
    const { comments, showCommentForm } = this.state;
    const { createCommentPath } = this.props.post;
    return(
      <div>
        <h4 className='panel-title'>Comments</h4>
        {
          comments.map(c => c.body)
        }
        {
        showCommentForm && <CommentForm path={createCommentPath} />
        }
        <button type='button' onClick={this.toggleShowForm}>
          <i className='fa fa-comment'></i>
          {this.state.buttonText}</button>
      </div>
    )
  }
}
