class PostSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper
  attributes :title,
             :body,
             :path,
             :comment_create_path,
             :created_at,
             :author_name

  has_many :comments

  def created_at
    "#{time_ago_in_words(object.created_at)} ago"
  end

  def author_name
    current_user == object.user ? 'Me' : object.user.to_s
  end

  def path
    view_context.post_path(object)
  end

  def comment_create_path
    view_context.post_comments_path(object)
  end

  private

  def current_user
    view_context.current_user
  end
end
