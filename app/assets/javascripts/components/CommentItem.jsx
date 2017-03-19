const CommentItem = props => {
  return(
    <div>
      <span>
      {props.comment.body}&nbsp;
      <em>{props.comment.authorName}</em>
    </span>
    </div>
  )
}
