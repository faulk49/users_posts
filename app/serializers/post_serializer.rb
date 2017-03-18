class PostSerializer < ActiveModel::Serializer
  attributes :title,
             :body,
             :path
  attribute :author_name do
    object.user.full_name
  end

  def path
    view_context.post_path(object)
  end
end
