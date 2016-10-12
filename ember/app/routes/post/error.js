import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function() {
      return true;
    },
    error: function(error) {
      console.log(error);
      console.log('post.error');
      throw new Error(error);
    }
  }
});
