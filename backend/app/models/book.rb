class Book < ApplicationRecord
  validates :title, :isbn, :page_count, :published_at, :raw_data, presence: true
end
