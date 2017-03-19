# Just a basic ruby class to represent a non signed in user
class GuestUser

  def first_name
    @first_name ||= 'Guest'
  end

  def first_name=(name)
    @first_name = name
  end

  def to_s
    first_name
  end
end
