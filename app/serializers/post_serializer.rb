class PostSerializer < ActiveModel::Serializer
  attributes :title,
             :body,
             :path,
             :comment_create_path
  attribute :author_name do
    object.user.full_name
  end

  has_many :comments

  def path
    view_context.post_path(object)
  end

  def comment_create_path
    view_context.post_comments_path(object)
  end
end
