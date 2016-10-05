import Ember from 'ember';

export default Ember.Route.extend({
  awsSign: Ember.inject.service(),

  model() {
    return "model";
  }

});
