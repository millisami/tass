#= require_self
#= require_tree ./models
#= require_tree ./controllers
#= require_tree ./views
#= require_tree ./helpers
#= require_tree ./templates

Tass = Ember.Application.create()
window.Tass = Tass

Tass.displayError = (e) ->
  if typeof e is 'string'
    alert e
  else if typeof e is 'object' and e.responseText?
    alert e.responseText
  else
    alert "An unexpected error occurred."

