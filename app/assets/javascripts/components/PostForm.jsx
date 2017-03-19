class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };

    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
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

  renderErrors(name) {
    const errors = this.props.errors[name];
    return errors && errors.map((e,i) => <p key={i} style={{color: 'red'}}>{e}</p>)
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
          {this.renderErrors('title')}

        <label>Body</label>
        <textarea
          value={body}
          className="form-control"
          onChange={this.setBody}/>
          {this.renderErrors('body')}

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
