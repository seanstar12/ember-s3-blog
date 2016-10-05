import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.post_id) {
      return this._getPost(params.post_id);
    }
    this.transitionTo('posts');
  },

  _getPost(id) {
    return this._getRecord(id).then(function(record) {
        return record;
    }, function(error) {
      let errorCode = error.errors[0].status;

      if (errorCode === "404") {
        throw new Error("Post " + id + " does not exist Kyle.");
      }
      else {
        throw new Error(errorCode + ". I don't know how to handle that Kyle.");
      }
    }, 'getRecord');

  },

  _getRecord(id) {
    var store = this.get('store'),
        type = 'post',
        record = store.peekRecord(type, id);

    if (Ember.isPresent(record)) {
      return Ember.RSVP.Promise.resolve(record);
    }
    else { 
      return store.findRecord(type, id);
    }
  },

  actions: {
    error(error, transition) {
      if (error) {
        return this.transitionTo('post.error')
          .then(function(route) {
            route.controller.set('model', error);
            route.controller.set('transition', transition);
          });
      }
    }
  }


});
