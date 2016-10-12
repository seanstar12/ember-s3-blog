import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('post', { path: '/post' },function() {
    this.route('index', { path: '/:post_id' }, function() {
      this.route('new', { path: '/edit'});  
    });

    this.route('new');
    this.route('loading');
  });


  this.route('posts', {path: '/'}, function() {
    this.route('loading');
  });


  this.route('index', {path: '/:page_id'});

  this.route('error', { path: '/pages/error' });

  this.route('not-found', { path: '/*path' });

});

export default Router;
