import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(),
  url: DS.attr(),
  date: DS.attr('es-date')

});
