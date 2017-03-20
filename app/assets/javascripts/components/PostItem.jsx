const PostItem = ({post, goToPost}) => {
  return(
    <div className="panel panel-post">
      <div className="panel-heading post">
        <a href='#'
          className="panel-title post"
          onClick={() => goToPost(post)}
          >{post.title}</a>
      </div>
      <div className="list-group">
        <div className="list-group-item">
            <p>By: {post.authorName}</p>
            <span><em>{post.createdAt}</em></span>
        </div>
      </div>
    </div>
  )
}
