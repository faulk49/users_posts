class CommentSerializer < ActiveModel::Serializer
  attributes :body, :author_name

  def author_name
    current_user == object.author ? 'Me' : object.author.to_s
  end

  private

  def current_user
    view_context.current_user
  end
end
