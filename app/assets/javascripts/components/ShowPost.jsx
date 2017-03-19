class ShowPost extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.goToIndex();
  }
  render() {
    const { post } = this.props;
    return(
      <div>
      <button onClick={this.goBack} type='button'>Back</button>
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
        <CommentList post={post} />
      </div>
    </div>
    )
  }
}
