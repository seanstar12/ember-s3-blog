import Ember from 'ember';
import EsQuery from 'ember-es-adapter/utils/es-query-builder';

export default Ember.Route.extend({
  model(params) {
    params = params ? params : {};
    if (true) {
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
      let es = new EsQuery(esParams);

      if (params.query) {
        es.addBool({"query_string": {"query":params.query}});
      }

      params['esQuery'] = es.buildQuery();
      return this.store.query('post', params);
    }
    //return this.store.findAll('post', {page:0, size:10, backgroundReload: false});

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
