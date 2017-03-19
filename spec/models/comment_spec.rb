require 'rails_helper'

describe Comment, type: :model do
  let(:comment) { build(:comment) }

  context 'valid factory' do
    it 'has a valid factory' do
      expect(comment).to be_valid
      expect(comment.body).not_to be_empty
    end
  end

  context 'validations' do
    it 'is not valid without a body' do
      comment.body = nil
      expect(comment).not_to be_valid
    end

    it 'is not valid without a post being present' do
      comment.post_id = nil
      expect(comment).not_to be_valid
    end

    it 'is not valid without an author' do
      comment.author_id = nil
      expect(comment).not_to be_valid
    end
  end

  context 'creating' do
    describe 'with all required attributes present' do
      subject { comment.save }
      it 'creates a new comment' do
        expect{subject}.to change(Comment, :count).by(1)
      end

      # it 'adds the comment to the authoring user associations' do
      #   post = comment.post
      #   user = post.user
      #   comment.author_id = user.id
      #   expect{subject}.to change(user.comments,:count).by(1)
      #   expect(user.comments.last).to eq(comment)
      # end
    end
  end
end
