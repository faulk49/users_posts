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
  end
end
