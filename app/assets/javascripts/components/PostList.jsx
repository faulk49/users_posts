class PostList extends React.Component {
  render() {
    const posts = this.props.posts;
    const showPost = this.props.showPost;
    return (
      <span>
        {
          posts && posts.map((post,index) => <PostItem post={post} key={index} goToPost={showPost} />)
        }
      </span>
    )
  }
}
