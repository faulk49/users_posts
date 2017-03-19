class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :first_name, :last_name, presence: true
  has_many :posts, dependent: :destroy
  has_many :comments, through: :posts

  def full_name
    "#{first_name} #{last_name}"
  end

  def to_s
    full_name
  end
end
