class PostsController < ApplicationController
  serialization_scope :view_context

  def index
    posts = Post.includes(:user).by_creation_date
    render json: posts,
            meta:
              {
                create_post_path: posts_path
              },
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
end
