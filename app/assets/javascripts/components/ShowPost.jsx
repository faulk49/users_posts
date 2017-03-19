class ShowPost extends React.Component {
  render() {
    const { post } = this.props;
    return(
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
        <CommentList />
      </div>
    )
  }
}
