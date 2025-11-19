class Book < ApplicationRecord
  validates :title, :isbn, :page_number, :year, :raw_data, presence: true
end
