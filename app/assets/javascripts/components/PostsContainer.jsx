class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      didFetchPosts: false,
      modalOpen: false,
      postFormErrors: {},
      showSinglePost: false,
      currentPost: null
    }

    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostsDone = this.fetchPostsDone.bind(this);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.showPostInfo = this.showPostInfo.bind(this);
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
    const { posts } = data;
    const { pagination, createPostPath } = data.meta;

    this.setState({ posts, didFetchPosts: true, pagination })
    this.postsPath = createPostPath
  }

  handleNewPostClick() {
    $('#postModal').modal('show');
    this.setState({ modalOpen: true });
  }

  hideModal() {
    $('#postModal').modal('hide');
    this.setState({ modalOpen: false, postFormErrors: {} });
  }

  handlePageChange(page){
    $.ajax({
      url: `${this.postsPath}?page=${page}`,
      dataType: 'json'
    })
    .done(data => this.fetchPostsDone(data))
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
      this.fetchPosts();
      this.hideModal();
    })
    .fail(err => this.setState({postFormErrors: err.responseJSON.errors}))
  }

  showPostInfo(val) {
    this.setState({currentPost: val, showSinglePost: true})
  }

  render() {
    const {
      posts,
      modalOpen,
      pagination,
      postFormErrors,
      currentPost,
      showSinglePost
    } = this.state;

    return(
      <div>
        {
          showSinglePost ? <ShowPost post={currentPost} /> :
          <div>
        <NewPostButton
          handleClick={this.handleNewPostClick}
          disabled={modalOpen}
        />
        <div className='row'>
          <div className='col-sm-7 col-sm-offset-4'>
            <PostList posts={posts} showPost={this.showPostInfo}/>
          </div>
        </div>
      </div>
      }
      <PostModal
        updatePosts={this.updatePosts}
        hideModal={this.hideModal}
        modalOpen={modalOpen}
        errors={postFormErrors}
      />
      </div>

    )
  }
}

const NewPostButton = props => {
  return(
    <button
      type="button"
      className="btn btn-primary btn-lg"
      onClick={props.handleClick}
      disabled={props.modalOpen}
    >Create New Post</button>
  )
}

const PostModal = props => {
  const { updatePosts, hideModal, modalOpen, errors } = props;
  return(
    <div className='modal fade' role='dialog' id="postModal" data-backdrop='static'>
      <div className='modal-dialog' role='dialog'>
        <div className='modal-content' role='document'>
          <div className='modal-header'>
            <h4 className='modal-title'>
              New Post
            </h4>
          </div>
          <div className='modal-body'>
            <PostForm
            errors={errors}
            submitPost={updatePosts}
            onCancel={hideModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
