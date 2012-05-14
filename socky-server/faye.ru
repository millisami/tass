ENV['BUNDLE_GEMFILE'] = File.expand_path('../Gemfile', File.dirname(__FILE__))
require 'bundler/setup'
require 'faye'

Faye::WebSocket.load_adapter('thin')

faye_server = Faye::RackAdapter.new(mount:'/faye', timeout: 45)
run faye_server

# Run: bundle exec rackup faye.ru -s thin -E production

# Curl:
# curl http://localhost:3000/metrics -d 'metric[process_name]=unicorn&metric[value]=24}'