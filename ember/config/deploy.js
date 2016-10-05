/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    s3: {
      region: 'us-east-1',
      filePattern: '**/*.{js,css,png,gif,html,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf}'
    }

  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.s3.bucket = 'ember-s3-blog-dev';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    ENV.s3.bucket = 'ember-s3-blog-stage';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3.profile = 'default';
    ENV.s3.bucket = 'ember-s3-blog-prod';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
