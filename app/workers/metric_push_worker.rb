require 'socky/client'

class MetricPushWorker
  include Sidekiq::Worker
  
  def perform(process_name, value)
    $socky_client = Socky::Client.new("http://#{APP_CONFIG[:socky_server_uri]}/http/cloudfactory", SOCKY_TOKEN)
    $socky_client.trigger!('unit_result', :channel => run.title, :data => { :account_name => run.account.name, :run_title => run.title, :station_has_subunits => station_has_subunits, :station_id => station_id, :unit_id => unit_id, :unit_index => unit_index, :page_number => page_number, :content => output}.to_json)
  end
end