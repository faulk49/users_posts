class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.post.comments,
      errors: {}
    }

    this.goBack = this.goBack.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  goBack() {
    this.props.goToIndex();
  }

  handleCommentSubmit(comment) {
    $.ajax({
      url: this.props.post.commentCreatePath,
      type: 'POST',
      data: { comment: { body: comment } }
    })
    .done(data => this.setState((prevState) => ({
      comments: prevState.comments.concat([data.comment]),
      errors: {}
    })))
    .fail(err => this.setState({errors: err.responseJSON.errors }))
  }
  render() {
    const { post } = this.props;
    const { comments } = this.state;
    return(
      <div>
      <button onClick={this.goBack} type='button'>Back</button>
      <div className='col-sm-8 col-sm-offset-4'>
      <div className='panel panel-default'>
        <div className='panel panel-heading'>
          <h3 className='panel-title'>
            {post.title}
          </h3>
        </div>
        <div className='list-group'>
          <div className='list-group-item'>
            <p>{post.body}</p>
          </div>
        </div>
      </div>
    </div>
      <CommentList
        post={post}
        errors={this.state.errors}
        comments={comments}
        onSubmit={this.handleCommentSubmit} />
    </div>
    )
  }
}
