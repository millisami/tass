Tass.Metric = Ember.Resource.extend
  url: "/metrics",
  name: 'metric'
  properties: ['process_name', 'value']

#  unitMetric: Ember.computed ->
#    return this.get('process_name') + "|" + this.get('value').property('process_name', 'value')
