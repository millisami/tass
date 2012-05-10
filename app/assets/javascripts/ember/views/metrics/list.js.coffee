Tass.ListMetricsView = Ember.View.extend
  templateName: 'ember/templates/metrics/list',
  metricsBinding: 'Tass.metricsController',
  
  refreshListing: ->
    Tass.metricsController.findAll()
