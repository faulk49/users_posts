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
            <p style={{color: '#6f2481'}}>{post.authorName}</p>
        </div>
      </div>
    </div>
  )
}
