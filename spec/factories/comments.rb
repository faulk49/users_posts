FactoryGirl.define do
  factory :comment do
    body Faker::Lorem.word
    post
    author_id { rand(1..10) }
  end
end
