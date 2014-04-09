Overview : what is the Mean stack, Why use it, basic tools used, folder structure and naming convention

pre : Install node & npm, mongodb (Robomongo is usefull too), install yeoman, install angular-generator

Most Basic set up

Step 1 : run `yo angular-fullstack poller`
        a) don't bother with Sas
        b) include Bootstrap
        c) include angular optional modules (require for passport and single page multi-view app)
        d) include mongoose
        e) include Passport

Step 2 : run Mongod to start the DB

Step 3 : from the `poller` directory run `grunt serve`

BOOM! got your first App.....


Creating our Polling App:

Step 4 : add new route "Poll"
    - 2 ways: non Yeoman way:
        create the following new file:
        - app/views/partials/poll.html
        - scripts/controllers/poll.controller.js

