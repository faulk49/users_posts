require 'rails_helper'

describe Post, type: :model do
  let(:post) { build(:post) }
  let!(:user_with_posts) { create(:user, :with_posts) }

  context 'valid factory' do
     it 'is valid' do
       expect(post).to be_valid
     end
  end

  context 'validations' do
    context 'with valid attributes' do

      it 'should have a title and body' do
        expect(post.title).to be_present
        expect(post.body).to be_present
      end
    end

    context 'with invalid or missing attributes' do

      it 'is not valid without a title' do
        post.title = nil
        expect(post).not_to be_valid
      end

      it 'is not valid without a body' do
        post.body = nil
        expect(post).not_to be_valid
      end
    end

    context 'creation' do
      let(:post) { create(:post) }

      it 'successfully creates a post record' do
        expect{post}.to change(Post, :count).by(1)
      end

      it 'does not create a post without a title' do
        post.title = nil
        expect{post}.to change(Post, :count).by(0)
      end

      it 'does not create a post without a body' do
        post.body = nil
        expect{post}.to change(Post, :count).by(0)
      end
    end
  end

  context 'scopes and class methods' do
    describe '.by_user' do
       it 'returns only the posts of the user id sent in' do
         results = Post.by_user(user_with_posts.id)
         expect(results).not_to be_empty
         expect(results).to eq(user_with_posts.posts)
       end
    end
  end
end
