# My Snowflake Blog
A 'blog' engine written in EmberJS that is statically hosted on S3 and has an ElasticSearch database.

#### TODO
 - [ ] Create the Ember App.
 - [ ] Put request signing in adapter or create addon?
 - [ ] Add the adapter and PUT functionallity
 - [ ] Definitely more...

#### What's the point of this?
Some people say that I don't care enough, so this is my attempt to be 'a better person'. Also, I hope this can aid other developers in the struggles of platform integration.

#### Infrastructure
* Amazon S3
* Amazon ElasticSearch
* localhost (for posting and deploying)
* Nodejs, Bower, EmberJS

--- 
### Part A -- Make an Ember App
Going to need Nodejs, bower, etc...
[Go here if you need your hand held](https://ember-cli.com/user-guide/).

```
$ ember new s3-blog
$ cd s3-blog
```

This downloads and installs (locally) all of the nodejs/bower files we need to continue.
It also gives us jellybean templates for config files. Now we can run the Ember server to test our hard work.

```
cd s3-blog
$ ember s
```

You should now have a 'Welcome to Ember' page running on `http://localhost:4200`. 

![Ember Running](https://s3.amazonaws.com/fkunfudiktihneudfccjctvfhjgch-s3-blog/post-images/001-ember+running.PNG)

[Did it work?](http://localhost:4200/)
If not, trouble shoot and fix it... We'll wait right here for you.

We should now put some test code into the template so that we can test the connection 
between S3 and ember in the next step. We'll do this by generating an index route. We'll 
also install some modules while we're at it for the publishing aspect.

```
$ ember g route index
```

Then Edit `app/templates/index.hbs` by adding "Hello World" to it.

```
Hello World
{{outlet}}
```
---

### Part 2 -- Getting Personal with S3
Since the goal of this project is static hosting, I planned on using a local
version of the site for uploading/editing. This prevents dirty hackers from being 
able to tamper with our stuff, however it does make 'blogging about your food'
more difficult when in the restaurant. You'll just have to suffer.

We're going to need the Amazon SDK to communicate with Amazon and get our files transfered to S3. You'll need credentials to talk to the Amazon services, and this guide is going to store credentials according to [S3 Docs for NodeJS](https://aws.amazon.com/sdk-for-node-js/).
We won't cover getting Amazon key pairs or IAM roles in this post, but they're only a quick Google away.

Now you're thinking, "But where do I put this (possibly) awesome stuff?" Well, I created a new bucket in S3
and enabled the "Static Website Hosting" option and set **Index Document** and **Error Document** to 
"index.html". Then I added permissions to make the site viewable for everyone.
Amazon saying "US Standard" for your bucket is the same as "us-east-1" just for future reference.

![s3 bucket](https://s3.amazonaws.com/fkunfudiktihneudfccjctvfhjgch-s3-blog/post-images/002-s3-bucket-config.PNG)


![s3 bucket Perms](https://s3.amazonaws.com/fkunfudiktihneudfccjctvfhjgch-s3-blog/post-images/003-s3-bucket-perms.PNG)

We'll use [Ember-cli-deploy-s3](https://github.com/ember-cli-deploy/ember-cli-deploy-s3) to upload our application to S3. This will be the bridge between our worlds. 

```
$ ember install ember-cli-deploy ember-cli-deploy-build ember-cli-deploy-s3

$ ember install ember-cli-deploy-gzip ember-cli-deploy-manifest
```

Edit `config/deploy.js` and add s3 to the Env. Most of the defaults in s3-deploy are great, but we also need to add .html to the files that get uploaded. We can do that by adding  **filePattern** into the S3 environemnt variable.

```
module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    s3: {
      bucket: 'insert-your-awesome-s3-alias-here-or-not--im-not-your-mom',
      region: 'us-east-1',
      filePattern: '**/*.{js,css,png,gif,html,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf}'
    }
  };
...
```

### Hold on to your butts...
We use the ember-cli-deploy module to build and push the app up to S3.
```
$ ember deploy production --verbose
```

If all went well, go to your endpont (bucket-name.s3-website-us-east-1.amazonaws.com) and you should have some success all over your hands.

![Site running on S3](https://s3.amazonaws.com/fkunfudiktihneudfccjctvfhjgch-s3-blog/post-images/004-site-on-s3.PNG)

___
### Section 3 -- Building The App (In progress)

```
$ ember g route posts
$ ember g model post
```
##### Crypto for signing requests

###### Info from 
* https://github.com/danieljoos/aws-sign-web
* http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

```
$ ember install ember-cryptojs-shim
```
Add HMAC-SHA256 to`/node_modules/ember-cryptojs-shim/vendor/cryptojs.js`. Not sure of better method yet, possibly need to create PR for him to add.
```
generateModule('cryptojs/hmac-sha256', { 'default': CryptoJS.HmacSHA256 });
```

