import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr(),
  title: DS.attr(),
  teaser: DS.attr(),
  date: DS.attr('date'),
  categories: DS.attr(),

});
