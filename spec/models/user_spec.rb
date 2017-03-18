require 'rails_helper'

describe User, type: :model do
  let(:user) { build(:user) }

  context "initialization" do
    it 'has a valid factory' do
      expect(user).to be_valid
    end
  end

  # Tests for attributes not included with Devise.
  context 'validations' do

    context 'with valid attributes' do
      # before(:each) { build(:user) }

      it 'should have a first name' do
        expect(user.first_name).to be_present
      end

      it 'should have a last name' do
        expect(user.last_name).to be_present
      end
    end

    context 'with invalid or missing attributes' do
      let(:user_no_first_name) { build(:user, first_name: nil) }
      let(:user_no_last_name) { build(:user, last_name: nil) }

      it 'is invalid without a first name' do
        expect(user_no_first_name).not_to be_valid
      end

      it 'is invalid without a last name' do
        expect(user_no_last_name).not_to be_valid
      end
    end
  end

  context 'creation' do
    let(:user) { create(:user) }

    it 'successfully creates a user record' do
      expect{user}.to change(User, :count).by(1)
    end

    it 'does not create a user without a first name' do
      user.first_name = nil
      expect{user}.to change(User, :count).by(0)
    end

    it 'does not create a user without a last name' do
      user.last_name = nil
      expect{user}.to change(User, :count).by(0)
    end
  end
end
