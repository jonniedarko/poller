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

