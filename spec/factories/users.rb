FactoryGirl.define do
  factory :user do
    email Faker::Internet.email
    first_name Faker::Name.unique.first_name
    last_name Faker::Name.unique.last_name
    password 'password'
    password_confirmation 'password'

    trait :with_posts do
      after(:create) do |instance|
        create_list(:post, 2, user: instance)
      end
    end
  end
end
