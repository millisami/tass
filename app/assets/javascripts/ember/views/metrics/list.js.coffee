Tass.ListMetricsView = Ember.View.extend
  templateName: 'app/templates/metrics/list',
  metricsBinding: 'Tass.metricsController',
  
  refreshListing: ->
    Tass.metricsController.findAll()
