###Overview
what is the Mean stack, Why use it, basic tools used, folder structure and naming convention

####pre
 - Install node & npm
 - Install mongodb (Robomongo is usefull too)
 - Install yeoman
 - Install angular-generator

####Basic Skeleton App set up

#####Step 1 : run `yo angular-fullstack poller`
1. Don't bother with Sas
2. Include Bootstrap
3. Include angular optional modules (require for passport and single page multi-view app)
4. Include mongoose
5. Include Passport

#####Step 2 : run Mongod to start the DB

#####Step 3 : from the `poller` directory run `grunt serve`

**BOOM!** You got your first MEAN stack App.....

####Creating our 1st new View:

Step 4: add new route "Poll"
######[Option A]: The non Yeoman way
#######1. Create the following new files:

- app/views/partials/poll.html

```
div[ng-include="'partials/navbar'"]+h3{Hello {{user}} from our Poll view and controller}
```

- scripts/controllers/poll.controller.js

```js
angular.module('pollsApp')
  .controller('PollCtrl', function ($scope) {
    $scope.user = "John";
  });
```
#######2. Update our Angular app routes
- Add the following conditions to our routeprovider in `app/scripts/app.js`
```js
.when('/poll', {
        templateUrl: 'partials/poll',
        controller: 'PollCtrl',
        authenticate: true
      })
```

#######3. Add our new controller script to our `index.html` Page
```html
<script src="scripts/controllers/poll.controller.js"></script>
```
#######4. Add a link to Our new View in the Navigation bar
- inside our navbar.controller, add the following to the `$scope.menu` variable
```js
{
    'title' : 'Polls',
    'link' : '/poll'
}
```

#####BAM! A New View (",)

So Lets Get Busy......



1 Create new add new routes:

```js
.when('/poll/:id',{
    templateUrl: 'partials/pollview',
    controller: 'PollViewCtrl',
    authenticate: true
  })
  .when('/poll/new',{
    templateUrl: 'partials/newpoll',
    controller: 'NewPollCtrl',
    authenticate: true
  })
```
- update poll.html

```html
    <div ng-include="'partials/navbar'"></div>
<!-- <h3>Hello {{user}} from our Poll view and controller</h3> -->
<div class="page-header">
    <h1>Poll List</h1>
</div>
<div class="row">
    <div class="col-xs-5">
        <a href="/poll/new" class="btn btn-default"><span class="glyphicon glyphicon-plus"></span> New Poll</a>
    </div>
    <div class="col-xs-7">
        <input type="text" class="form-control" ng-model="query" placeholder="Search for a poll">
    </div>
</div>
<div class="row">
    <div class="col-xs-12">
        <hr>
    </div>
</div>
<div class="row" ng-switch on="polls.length">
    <ul ng-switch-when="0">
        <li><em>No polls in database. Would you like to
            <a href="/poll/new">create one</a>?
        </li>
    </ul>
    <ul ng-switch-default>
        <li ng-repeat="poll in polls | filter:query">
        <a href="/poll/view/{{poll._id}}">{{poll.question}}</a>
        </li>
    </ul>
</div>
<p>&nbsp;</p>
```
- create pollview.html

```html
<div ng-include="'partials/navbar'"></div>
<div class="page-header">
   <h1>View Poll</h1>
</div>
<div class="well well-lg">
   <strong>Question</strong><br>{{poll.question}}
</div>
<div ng-hide="poll.userVoted">
   <p class="lead">Please select one of the following options.</p>
   <form role="form" ng-submit="vote()">
      <div ng-repeat="choice in poll.choices" class="radio">
         <label>
         <input type="radio" name="choice" ng-model="poll.userVote"
            value="{{choice._id}}">
         {{choice.text}}
         </label>
      </div>
      <p>
      <hr>
      </p>
      <div class="row">
         <div class="col-xs-6">
            <a href="/poll" class="btn btn-default" role="button">
               <span
                  class="glyphicon glyphicon-arrow-left"></span> Back to Poll
         </div>
         <div class="col-xs-6">
         <button class="btn btn-primary pull-right" type="submit">
         Vote &raquo;</button>
         </div>
      </div>
   </form>
</div>
<div ng-show="poll.userVoted">
<table class="result-table">
<tbody>
<tr ng-repeat="choice in poll.choices">
<td>{{choice.text}}</td>
<td>
<table style="width: {{choice.votes.length/poll.totalVotes*100}}%;">
<tr><td>{{choice.votes.length}}</td></tr>
</table>
</td>
</tr>
</tbody>
</table>
<p><em>{{poll.totalVotes}} votes counted so far. <span
   ng-show="poll.userChoice">You voted for <strong>{{poll.userChoice.text}}
</strong>.</span></em></p>
<p><hr></p>
<p><a href="/poll" class="btn btn-default" role="button">
<span class="glyphicon glyphicon-arrow-left"></span> Back to
Poll List</a></p>
</div>
<p>&nbsp;</p>
```
- create newpoll.html
```html
<div ng-include="'partials/navbar'"></div>
<div class="page-header">
  <h1>Create New Poll</h1>
</div>
<form role="form" ng-submit="createPoll()">
  <div class="form-group">
    <label for="pollQuestion">Question</label>
    <input type="text" ng-model="poll.question" class="form-control" id="pollQuestion" placeholder="Enter poll question">
  </div>
  <div class="form-group">
    <label>Choices</label>
    <div ng-repeat="choice in poll.choices">
      <input type="text" ng-model="choice.text" class="form-control" placeholder="Enter choice {{$index+1}} text"><br>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <button type="button" class="btn btn-default" ng-click="addChoice()">
        <span class="glyphicon glyphicon-plus"></span>
        Add another
      </button>
    </div>
  </div>
  <p><hr></p>
  <div class="row">
    <div class="col-xs-6">
      <a href="/poll" class="btn btn-default" role="button"><span class="glyphicon glyphicon-arrow-left"></span>Back to Poll List</a>
    </div>
    <div class="col-xs-6">
      <button class="btn btn-primary pull-right" type="submit">Create Poll &raquo;</button>
    </div>
  </div>
  <p>&nbsp;</p>
</form>
```
- update the controller and add 2 new controllers

```js
'use strict';

angular.module('pollsApp')
  .controller('PollCtrl', function ($scope) {
    $scope.polls = [];
  })
  .controller('PollViewCtrl', function ($scope, $routeParams){
    $scope.poll = {};
    $scope.vote = function() {};
  })
  .controller('NewPollCtrl', function ($scope){
     $scope.poll = {
        question: '',
        choices: [{ text: '' }, { text: '' }, { text: '' }]
      };
      $scope.addChoice = function() {
        $scope.poll.choices.push({ text: '' });
      };
  });

```
Now At this point, if you run the app, you will see an empty poll list. If you try to create a new poll, you will be able to see the form and add more choices, but you won't be able to save the poll. So Lets change that next...


####Storing Data in MongoDB

So Lets create a new model for our polls

- inside our `lib/models/` directory create `Poll.js`

```js
var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({
  text: String,
  votes: [voteSchema]
});
exports.PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: [choiceSchema]
});
```
- next we need to Define our API routes in our express server
inside our server's `lib/routes.js` we need to add our Restfull routes for communicating with Mongodb
add the following :
    - First add in our reference to our server-side Poll controller

    `poll = require('./controllers/polls');`

    - Next add our routes

```js
app.get('/polls/polls', poll.list);
app.get('/polls/:id', poll.poll);
app.post('/polls', poll.create);
```

    - and create our `polls.js` controller in `lib/controllers` and add the following:

```js
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'pollsapp');
var PollSchema = require('../models/Poll.js').PollSchema;
var Poll = db.model('polls', PollSchema);

// JSON API for list of polls
exports.list = function(req, res) {
  Poll.find({}, 'question', function(error, polls) {
    res.json(polls);
  });
};
// JSON API for getting a single poll
exports.poll = function(req, res) {
  var pollId = req.params.id;
  Poll.findById(pollId, '', { lean: true }, function(err, poll) {
    if(poll) {
      var userVoted = false,
          userChoice,
          totalVotes = 0;
      for(c in poll.choices) {
        var choice = poll.choices[c];
        for(v in choice.votes) {
          var vote = choice.votes[v];
          totalVotes++;
          if(vote.ip === (req.header('x-forwarded-for') || req.ip)) {
            userVoted = true;
            userChoice = { _id: choice._id, text: choice.text };
          }
        }
      }
      poll.userVoted = userVoted;
      poll.userChoice = userChoice;
      poll.totalVotes = totalVotes;
      res.json(poll);
    } else {
      res.json({error:true});
    }
  });
};
// JSON API for creating a new poll
exports.create = function(req, res) {
  var reqBody = req.body,
      choices = reqBody.choices.filter(function(v) { return v.text != ''; }),
      pollObj = {question: reqBody.question, choices: choices};
  var poll = new Poll(pollObj);
  poll.save(function(err, doc) {
    if(err || !doc) {
      throw 'Error';
    } else {
      res.json(doc);
    }
  });
};
```

Ok so right now what we hav just done makes no difference to the client side, we need to hook it all up with an Angular Service, or in our case a Factory

So lets Create our first Factory `app/scripts/services/poll.factory.js` and add the following

```js
angular.module('pollServices', ['ngResource'])
  .factory('Poll', function($resource) {
    return $resource('polls/:pollId', {}, {
      query: { method: 'GET', params: { pollId: 'polls' }, isArray: true }
    })
  });
```

Now just add it to our app/views/index.html

`<script src="scripts/services/poll.factory.js"></script>`

Now in order to use our new Module, we need to ass it to our apps module dependencies. in app.js as follows

```js
angular.module('pollsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pollServices'
])
```

Now it can be used just like any other module. so make the following changes to the `poll.controller.js`

```js
'use strict';

angular.module('pollsApp')
  .controller('PollCtrl', function ($scope, Poll) {
    $scope.polls = Poll.query();
  })
  .controller('PollViewCtrl', function ($scope, $routeParams, Poll){
    $scope.poll = Poll.get({pollId: $routeParams.id});
    $scope.vote = function() {};
  })
  .controller('NewPollCtrl', function ($scope, Poll){
     $scope.poll = {
        question: '',
        choices: [{ text: '' }, { text: '' }, { text: '' }]
      };
      $scope.addChoice = function() {
        $scope.poll.choices.push({ text: '' });
      };

     $scope.createPoll = function() {
        var poll = $scope.poll;
        if(poll.question.length > 0) {
          var choiceCount = 0;
          for(var i = 0, ln = poll.choices.length; i < ln; i++) {
            var choice = poll.choices[i];
            if(choice.text.length > 0) {
              choiceCount++
            }
          }
          if(choiceCount > 1) {
            var newPoll = new Poll(poll);
            newPoll.$save(function(p, resp) {
              if(!p.error) {
                $location.path('polls');
              } else {
                alert('Could not create poll');
              }
            });
          } else {
            alert('You must enter at least two choices');
          }
        } else {
          alert('You must enter a question');
        }
      };
  });
```