Tass.metricsController = Ember.ResourceController.create
  resourceType: Tass.Metric
  
  # from: null
  
  refresh: -> (
    $("#tass_chart").charts
  )
    
