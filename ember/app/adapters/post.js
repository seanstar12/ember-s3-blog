import ES from 'ember-es-adapter/adapters/adapter';
import config from 'ember-get-config';

export default ES.extend({
  host: config.EsAdapter.host,
  namespace: config.EsAdapter.namespace
});
