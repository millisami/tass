ENV['BUNDLE_GEMFILE'] = File.expand_path('../Gemfile', File.dirname(__FILE__))
require 'bundler/setup'
require 'socky/server'

SOCKY_TOKEN = "dh3gwef76gasdfk23gsdfj2kl3jwkljjlkj"

options = {
  :debug => true,
  :applications => {
    :tass => SOCKY_TOKEN
  }
}

map '/websocket' do
  run Socky::Server::WebSocket.new options
end

map '/http' do
  use Rack::CommonLogger
  run Socky::Server::HTTP.new options
end

# Start command
# BUNDLE_GEMFILE=./socky-server/Gemfile bundle exec thin-websocket -R ./socky-server/socky.ru -p3001 start

# Start with:
# $ bundle exec thin -R socky.ru -p3001 start
