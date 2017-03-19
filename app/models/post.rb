class Post < ActiveRecord::Base
  include Filterable

  validates :title, :body, presence: true
  belongs_to :user
  has_many :comments, dependent: :destroy

  scope :by_creation_date, -> { order(created_at: :desc) }
  scope :by_user, ->(user_id) { where(user_id: user_id)}
end
