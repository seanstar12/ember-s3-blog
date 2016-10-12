import Ember from 'ember';
import {QueryDSL} from 'ember-es-adapter/utils/es-tools';

export default Ember.Route.extend({
  model(params) {
    params = params ? params : {};
    if (false) {
      params['esParams'] = {sort: 'date', sortType: 'desc'};
      params['backgroundReload'] = true;

      return this.store.query('post', params);
    }
    else {
      //simulated params
      //params['size'] = 2;
      //params['query'] = 'swagblazeit';

      //adding es params into the default params, and initiating new instance
      let esParams = {'sort': 'date', 'sortType': 'desc'};
      let dsl = new QueryDSL(esParams);

      dsl.query()
        .bool()
        .match_phrase({'title': 'second'});

      console.log(dsl.getThis());
      params['esQuery'] = {query:{match_all:{}},size: 20, sort: [{date:'desc'}]};
      return this.store.query('post', params);
    }
    //return this.store.findAll('post', {page:0, size:10, backgroundReload: false});

  },

  setupController(controller, model) {
    if (Ember.ENV.Admin) {
      controller.set('isAdmin', true);
    }
    controller.set('model', model);
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
    },
    addPost() {
      this.transitionTo('post.new');
    }
  }


});
