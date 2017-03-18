class PostsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      didFetchPosts: false,
      modalOpen: false
    }
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostsDone = this.fetchPostsDone.bind(this);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.updatePosts = this.updatePosts.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
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
    this.setState({ modalOpen: false });
  }

  handlePageChange(page){
    $.ajax({
      url: `${this.postsPath}?page=${page}`,
      dataType: 'json'
    })
    .done(data => this.fetchPostsDone(data))
  }

  filterPosts() {
    $.ajax({
      url: '/posts?by_user=1',
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
    });
  }

  render() {
    const { posts, modalOpen, pagination } = this.state;
    return(
      <div>
        <PostModal
          updatePosts={this.updatePosts}
          hideModal={this.hideModal}
          modalOpen={modalOpen}
        />
        <NewPostButton
          handleClick={this.handleNewPostClick}
          disabled={modalOpen}
        />
        {
          pagination &&
            <span className='pull-right'>
              <button
                onClick={() => this.handlePageChange(pagination.posts.nextPage || 1)} type='button'>Next</button>
              <button
                onClick={() => this.handlePageChange(pagination.posts.prevPage || 1)}
                type='button'>Prev</button>
            </span>
        }
          <PostList posts={posts}/>
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
      disabled={props.modalOpen}
    >New Post</button>
  )
}

const PostModal = props => {
  const { updatePosts, hideModal, modalOpen } = props;
  return(
    <div className='modal fade' role='dialog' id="postModal">
      <div className='modal-dialog' role='dialog'>
        <div className='modal-content' role='document'>
          <div className='modal-header'>
            <h4 className='modal-title'>
              New Post
            </h4>
          </div>
          <div className='modal-body'>
            <PostForm
            submitPost={updatePosts}
            onCancel={hideModal}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// const MyPosts = props => {
//   return(
//     <button type="button" onClick={props.filterByUser}>My Posts</button>
//   )
// }
