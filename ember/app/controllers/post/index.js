import Ember from 'ember';
import fetch from "ember-network/fetch";
import EsTools from "ember-es-adapter/utils/es-mapper";

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  toast: Ember.inject.service(),

  post: null,
  disableSubmit: false,
  buttonText: Ember.computed('isEditing', function() {
    return this.get('isEditing') ? "Save":"Edit";
  }),

  init() {
    let es = new EsTools();

    this.set('post',
      Ember.Object.create({
        body: null,
        date: null,
        favorite: false,
        tags: Ember.A(),
        teaser: null,
        title: null,
        postId: null,
        id: null
      }));

  },

  actions: {
    onDateSelect(date) {
      this.get('post').set('date', date);
    },

    deletePost(model) {
      console.log(model);
      model.deleteRecord();
      model.save();
    },

    edit(model) {
      let toast = this.get('toast');

      if (this.get('isEditing')) {
        model.save()
          .then(function(msg) {
            toast.success('"' + msg.get('title') + '" has saved successfully.', 'Post Saved');
          }, function(err) {
            toast.error(err, 'Save Failed');
            console.log('save failed'); 
            console.log(err); 
          });
      }
      this.toggleProperty('isEditing');
    },

    cancel(model) {
      this.set('isEditing', false);
    },

    setDate(date) {
      this.set('model.date', date);
    },

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
