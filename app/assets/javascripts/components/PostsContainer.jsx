class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      posts: [],
      didFetchPosts: false,
      showForm: false
    }
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostsDone = this.fetchPostsDone.bind(this);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    $.ajax({
      url: '/posts',
      dataType: 'json',
    })
    .done(data => this.fetchPostsDone(data))
  }

  fetchPostsDone(data){
    const { posts } = data
    this.setState({ posts, didFetchPosts: true })
    this.postsPath = data.meta.createPostPath
  }

  handleNewPostClick() {
    this.setState({ showForm: true })
  }

  hideForm(){
    this.setState({ showForm: false })
  }

  updatePosts(vals) {
    const post = {
      title: vals.title,
      body: vals.body
    }

    $.ajax({
      url: this.postsPath,
      type: 'POST',
      data: { post }
    })
    .done(data => {
      this.setState(previousState => ({
        posts: [data.post, ...previousState.posts],
        showForm: false
      }));
    });
  }

  render() {
    const { posts, showForm } = this.state;
    return(
      <div>
        {
          showForm ?
            <NewPostForm submitPost={this.updatePosts} onCancel={this.hideForm} />
            :
            <NewPostButton handleClick={this.handleNewPostClick} />
        }
        {
          posts.length && posts.map((post,index) => <PostItem post={post} key={index}/>)
        }
      </div>
    )
  }
}

const NewPostButton = props => {
  return(
    <button
      type="button"
      className="btn btn-primary"
      onClick={props.handleClick}
    >New Post</button>
  )
}
