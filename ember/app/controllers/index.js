import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  isEditing: false,

  buttonText: Ember.computed('isEditing', function() {
    return this.get('isEditing') ? "Save":"Edit";
  }),

  actions: {
    onDateSelect(date) {
      this.get('model').set('date', date);

    },

    deletePost(model) {
      model.deleteRecord();
      model.save();
    },

    edit(model) {
      if (this.get('isEditing')) {
        model.save();
      }

      this.toggleProperty('isEditing');
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
