import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onDateSelect(date) {
      this.get('post').set('date', date);

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
        return this.transitionTo('/pages/error')
          .then(function(route) {
            route.controller.set('model', error);
            route.controller.set('transition', transition);
          });
      }
    }
  }
});
