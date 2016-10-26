import Ember from 'ember';
import fetch from "ember-network/fetch";
import EsTools from "ember-es-adapter/utils/es-mapper";

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  toast: Ember.inject.service(),
  postId: 0,
  time: null,
  post: null,
  disableSubmit: false,

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

    es.getLastId('posts', 'post-id')
      .then((num) => {
        num += 1;
        this.set('postId', num);
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
      let toast = this.get('toast');

      let record = store.createRecord('post', {
        title: post.title,  
        date: post.date,  
        body: post.body,  
        teaser: post.teaser,  
        favorite: post.favorite,  
        postId: this.get('postId'),  
        id: this.get('postId'),  
      });

      record.save()
        .then(() => {
          toast.success('Post Created'); 
        }, (err, msg) => {
          console.log({err,msg});
          toast.error(err,'Creation Failed'); 

        });
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
