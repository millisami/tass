Tass.Metric = Ember.Resource.extend
  resourceUrl: "/metrics",
  resourceName: 'metric'
  resourceProperties: ['process_name', 'value']

#  unitMetric: Ember.computed ->
#    return this.get('process_name') + "|" + this.get('value').property('process_name', 'value')
