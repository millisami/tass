class CreateMetrics < ActiveRecord::Migration
  def change
    create_table :metrics do |t|
      t.string :process_name
      t.float :value

      t.timestamps
    end
  end
end
