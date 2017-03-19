require 'rails_helper'

describe "Logging in", :type => :feature do
  let(:user) { create(:user) }
  it "signs a user in" do
    visit '/'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'
    expect(page).to have_content 'Signed in successfully'
  end
end
