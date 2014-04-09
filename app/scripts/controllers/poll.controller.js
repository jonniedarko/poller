'use strict';

angular.module('pollsApp')
  .controller('PollCtrl', function ($scope, Poll) {
    $scope.polls = Poll.query();
  })
  .controller('PollViewCtrl', function ($scope, $routeParams, Poll){
    $scope.poll = Poll.get({pollid: $routeParams.id});
    console.log("poll.choices", $scope.poll.choices);
    $scope.vote = function() {};
  })
  .controller('NewPollCtrl', function ($scope, $location, Poll){
     $scope.poll = {
        question: '',
        choices: [{ text: '1' }, { text: '2' }, { text: '3' }]
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
                $location.path('poll');
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