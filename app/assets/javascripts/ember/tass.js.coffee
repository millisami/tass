#= require_self
#= require_tree ./models
#= require_tree ./controllers
#= require_tree ./views
#= require_tree ./helpers
#= require_tree ./templates

Tass = Ember.Application.create
  ready: ->
    # EmberTest.Notifications.refresh()
    # EmberTest.Notifications.set("from", Math.round(new Date().getTime() / 1000))
    this._super
    
window.Tass = Tass

Tass.displayError = (e) ->
  if typeof e is 'string'
    alert e
  else if typeof e is 'object' and e.responseText?
    alert e.responseText
  else
    alert "An unexpected error occurred."

# socky = new Socky.Client('ws://localhost:3001/websocket/tass')
# @set 'socky', socky
# channel = socky.subscribe('tass-metrics')
# socky.bind("new_metric") -> (data)
#   alert(data)
# socky.bind("socky:connection:established") -> (data)
#   alert("Connection established.")
#   
#   function startSocky(run_title) {
#     // Connect to Socky Server
#     var socky = new Socky.Client("ws://<%= APP_CONFIG[:socky_server_uri] %>/websocket/cloudfactory");
# 
#     // Subscribe to channel
#     var channel = socky.subscribe("<%= @run.title %>");
# 
#     // Bind function to 'unit_result' event
#     channel.bind("unit_result", function(data) {
#       data = $.parseJSON(data);
#       console.log("Push notification aayo.");
#       updateTable(data);
#     });
#   };
#   