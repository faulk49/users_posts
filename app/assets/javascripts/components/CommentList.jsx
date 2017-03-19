class CommentList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: props.comments || []
    }
  }
  render() {
    const { comments } = this.state;
    return(
      <div>
        <h4 className='panel-title'>Comments</h4>
        {
          comments.map(c => c.body)
        }
      </div>
    )
  }
}
