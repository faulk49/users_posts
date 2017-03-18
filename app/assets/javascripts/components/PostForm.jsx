class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };

    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  setTitle(e) {
    const title = e.target.value;
    this.setState({ title })
  }

  setBody(e) {
    const body = e.target.value;
    this.setState({ body })
  }

  clearForm() {
    this.setState({ title: '', body: '' })
  }

  handleSubmit() {
    this.props.submitPost(this.state)
    this.clearForm();
  }

  handleCancel() {
    this.props.onCancel();
    this.clearForm();
  }

  render() {
    const { title, body } = this.state;
    return(
      <div>
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={this.setTitle}
          className='form-control'
          autoFocus={true}
          autoComplete={false}
        />

        <label>Body</label>
        <textarea
          value={body}
          className="form-control"
          onChange={this.setBody}/>

        <button
          type='button'
          className='btn btn-success'
          onClick={this.handleSubmit}
        >Create Post</button>

        <button
          type='button'
          className='btn btn-danger pull-right'
          onClick={this.handleCancel}
          >Cancel</button>
      </div>
    )
  }
}
