class UserSerializer < ActiveModel::Serializer
  attribute :full_name
  has_many :posts
end
