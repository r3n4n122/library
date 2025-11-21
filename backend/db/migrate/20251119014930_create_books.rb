class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :isbn, null: false
      t.integer :page_count, null: false
      t.integer :published_at, null: false
      t.json :raw_data, default: {}, null: false
      t.timestamps
    end
    add_index :books, :isbn, unique: true
  end
end
