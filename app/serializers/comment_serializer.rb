class CommentSerializer < ActiveModel::Serializer
  attribute :body
  attribute :author_name do
    object.author.full_name
  end
end
