class CommentsController < ApplicationController
  before_action :load_post

  def create
    comment = @post.comments.new(comment_params)
    comment.author_id = current_user.id
    if comment.save
      render json: comment,
              key_transform: :camel_lower,
              status: :created
    else
      render json: { errors: comment.errors } , status: :unprocessable_entity
    end
  end

  private

  def load_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end
end
