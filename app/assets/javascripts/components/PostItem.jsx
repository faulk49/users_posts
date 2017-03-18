const PostItem = ({post}) => {
  return(
      <div>
        <h4>{post.title}</h4>
        <p>{post.body}</p>
        <p>By: {post.authorName}</p>
      </div>
  )
}
