class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    }
    this.setBody = this.setBody.bind(this);
  }

  setBody(e) {
    const body = e.target.value;
    this.setState({ body })
  }

  render() {
    return(
      <div>
        <input
          type='text'
          onChange={this.setBody}
          value={this.state.body}
          autoFocus={true}
          autoComplete={false} />
        <a href='#'>post</a>
      </div>
    )
  }
}
