import Ember from 'ember';
import computed from 'ember-data';
import fetch from "ember-network/fetch";
import {EsTools} from "ember-es-adapter/utils/es-tools";

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  time: null,
  page: null,
  disableSubmit: false,
  pageId: 0,

  init() {
    let es = new EsTools();

    this.set('page',
      Ember.Object.create({
        body: null,
        date: new Date(),
        title: null,
        url: null,
        pageId: null,
      }));

    es.getLastId('pages', 'page-id')
      .then((num) => {
        if (Number.isInteger(num)) {
          console.log('no fail');
          this.set('pageId', num += 1);
        }
      })
      .catch((msg) => {
        console.log('failed');
        console.log(msg);
      })
  },

  actions: {
    createPage() {
      let store = this.get('store');
      let page = this.get('page');
      let self = this;

      let record = store.createRecord('page', {
        title: page.title,
        date: page.date,
        url: page.url,
        body: page.body,
        pageId: this.get('pageId'),
        id: page.url
      });

      record.save()
        .then((resp) => {
          self.transitionToRoute('posts');
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
