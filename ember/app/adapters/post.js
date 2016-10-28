import ES from 'ember-es-adapter/adapters/adapter';
import env from 's3-blog/config/environment';

export default ES.extend({
  host: env.APP.EsAdapter.host,
  namespace: env.APP.EsAdapter.namespace

});
