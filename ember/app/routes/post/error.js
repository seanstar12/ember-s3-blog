import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function() {
      return true;
    },
    error: function(error) {
      this.transitionTo('index');
      throw new Error(error);
    }
  }
});
