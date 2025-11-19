class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :isbn, null: false
      t.integer :page_number, null: false
      t.integer :year, null: false
      t.json :raw_data, default: {}, null: false
      t.timestamps
    end
  end
end
