# Tass = Ember.Application.create()
# 
# window.Tass = Tass
# 
# Tass.Metric = Em.Object.extend
#   processName: null
#   value: 0.0
# 
# Tass.metricsController = Em.ArrayProxy.create
#   content: []
# 
#   createMetric: (process_name) ->
#     metric = Tass.Metric.create(processName: process_name)
#     @pushObject(metric)
#   
# Tass.CreateMetricView = Em.TextField.extend
#   insertNewline: ->
#     value = @get('value')
#     
#     if value
#       Tass.metricsController.createMetric(value)
#       @set('value', '')