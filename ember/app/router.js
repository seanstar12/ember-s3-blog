import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts' ,function() {
    this.route('error');
    this.route('loading');
  });
  this.route('post', { path: '/post' },function() {
    this.route('index', { path: '/:post_id' });
    this.route('new');
    this.route('error');
    this.route('loading');
  });
  this.route('about');
});

export default Router;
