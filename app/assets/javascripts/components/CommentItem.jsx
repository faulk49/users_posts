const CommentItem = props => {
  return(
    <div className='list-group-item'>
      <span>
        {props.comment.body}-
        <em>{props.comment.authorName}</em>
      </span>
  </div>
  )
}
