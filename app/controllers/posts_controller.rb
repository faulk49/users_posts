class PostsController < ApplicationController
  serialization_scope :view_context

  def index
    posts = Post.includes(:user, :comments)
                .by_creation_date
                .filter(filter_params)
                .page(params[:page])
                .without_count

    render json: posts,
            meta:
                pagination_attributes(posts,
                create_post_path: posts_path
                ),
              key_transform: :camel_lower,
            status: :ok
  end

  def create
    post = current_user.posts.new(post_params)
    if post.save
      render json: post, status: :created
    else
      render json: { errors: post.errors }, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def filter_params
    params.slice(:by_user)
  end
end
