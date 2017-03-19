require 'rails_helper'

describe Post, type: :model do
  let(:post) { build(:post) }

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
    let!(:post1) { create(:post) }
    let!(:post2) { create(:post) }

    describe 'all posts' do
      it 'returns posts from all users' do
        result = Post.all
        expect(result).to be_a(ActiveRecord::Relation)
        expect(result).not_to be_empty
        expect(result).to include(post1, post2)
      end

       it 'returns all posts in order of creation(oldest first)' do
         result = Post.by_creation_date
         expect(result).not_to be_empty
         expect(result).to eq([post2, post1])
         expect(result).not_to eq([post1, post2])
       end
    end
  end
end
