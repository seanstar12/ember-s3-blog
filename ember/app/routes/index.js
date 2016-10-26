import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.page_id) {
      return this._getPage(encodeURI(params.page_id));
    }
    this.transitionTo('posts');
  },

  setupController(controller, model) {
    console.log(Ember.ENV);
    if (Ember.ENV.Admin) {
      controller.set('isAdmin', true);
    }
    controller.set('model', model);
  },

  _getPage(id) {
    return this._getRecord(id).then(function(record) {
        return record;
    }, function(error) {
      let errorCode = error.errors[0].status;

      if (errorCode === "404") {
        console.log('404');
        throw new Error("Page " + id + " does not exist Kyle.");
      }
      else {
        console.log('wtf');
        throw new Error(errorCode + ". I don't know how to handle that Kyle.");
      }
    }, 'getRecord');

  },

  _getRecord(id) {
    var store = this.get('store'),
        type = 'page',
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
        return this.transitionTo('/pages/error');
      }
    },

    deletePost(model) {
      model.deleteRecord();
      model.save();
    },

    edit(model) {
      this.set('isEditing', true);
    }

  }


});
