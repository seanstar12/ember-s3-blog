import Ember from 'ember';
import fetch from "ember-network/fetch";
import EsTools from "ember-es-adapter/utils/es-mapper";

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  time: null,
  post: null,
  disableSubmit: false,

  init() {
    let es = new EsTools();

    es.getLastId('posts', 'post-id')
      .then((num) => {
        num++;

        this.set('post',
          Ember.Object.create({
            body: null,
            date: null,
            favorite: false,
            tags: Ember.A(),
            teaser: null,
            title: null,
            postId: num,
            id: num
          }));
      });
  },

  actions: {
    onDateSelect(date) {
      //let time = this.get('time');
      //if (time) {
      //  let [hours, mins]  = time.split(':');
      //  console.log({date, hours, mins});
      //  if (Number.isInteger(hours) &&
      //      Number.isInteger(mins)) {
      //    
      //  }
      //}
      this.get('post').set('date', date);

    },
    createPost() {
      let store = this.get('store');
      let post = this.get('post');

      let record = store.createRecord('post', {
        title: post.title,  
        date: post.date,  
        body: post.body,  
        teaser: post.teaser,  
        favorite: post.favorite,  
        postId: post.postId,  
        id: post.id,  
      });

      record.save();
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
