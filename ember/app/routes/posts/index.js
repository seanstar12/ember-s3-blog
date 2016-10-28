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
      params['size'] = 10;
      params['page'] = 0;

      //adding es params into the default params, and initiating new instance

      //let esParams = {'size': 15, 'sort': {'date':'desc'}};
      //let dsl = new QueryDSL(esParams);

      if (false){
        dsl.query()
          .bool('must')
          .match({'title': 'jerry'})
          .term({'user': 'steve'});

        dsl.size(10).from(0);

        dsl.filter()
          .bool('must')
          .match({'title': 'tim'});

        dsl.highlight({fields:{content:{}}});

        //dsl.highlight()
        //  .fields({"content" : {}});

        //dsl.query()
        //  .match({"title": 'lenny'});

        //dsl.query({match_all:{}})

        //dsl.query({match_all:{}})
        //  .sort(['date', {'title' : 'asc'}]);
      }

      let dsl = new QueryDSL(params);
      dsl.query({match_all:{}})
        .sort({'date': 'desc'});

      params['esQuery'] = dsl.getQuery();
      return this.store.query('post', params);
    }
      //params['esQuery'] = {query:{match_all:{}},size: 20, sort: [{date:'desc'}]};
    //return this.store.findAll('post', {page:0, size:10, backgroundReload: false});

  },

  setupController(controller, model) {
    if (Ember.ENV.Admin) {
      controller.set('isAdmin', true);
    }
    controller.set('model', model);
  },

  actions: {
    error(error) {
      if (error) {
        console.log(error);
        //return this.transitionTo('posts.error')
        //  .then(function(route) {
        //    route.controller.set('model', error);
        //    route.controller.set('transition', transition);
        //  });
      }
    },
    addPost() {
      this.transitionTo('post.new');
    },
    addPage() {
      this.transitionTo('pages.new');
    }
  }


});
