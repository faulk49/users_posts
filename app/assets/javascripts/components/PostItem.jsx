const PostItem = ({post}) => {
  return(
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{post.title}</h3>
      </div>
      <div className="list-group">
        <div className="list-group-item">
          <a href="#">
            {post.authorName}
          </a>
        </div>
      </div>
    </div>
  )
}
