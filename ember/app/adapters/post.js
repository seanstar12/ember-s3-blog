import ES from 'ember-es-adapter/adapters/adapter';
import config from 'ember-get-config';
//import Ember from "ember";
//import EsQuery from 'ember-es-adapter/utils/es-query-builder';
//import fetch from "ember-network/fetch";

export default ES.extend({
  host: config.EsAdapter.host,
  namespace: config.EsAdapter.namespace
});
