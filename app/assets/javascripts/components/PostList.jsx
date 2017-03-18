class PostList extends React.Component {
  render() {
    const posts = this.props.posts;
    return (
      <span>
      {
        posts && posts.map((post,index) => <PostItem post={post} key={index} />)
      }
    </span>
    )
  }
}
