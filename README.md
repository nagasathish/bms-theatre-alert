# bms-theatre-alert

A Node and Express Application to get the updates of a movie (BookMyShow URL to be passed) screens/theatres list when new screens are added. Node Mailer is included so when new screen added it will trigger an email.



To Run Application

Install the below node modules

<pre>
npm install express
npm install nodemailer
npm install request
 </pre>
 Alerts and Popups are managed here
<pre>public/javascripts/main.js</pre> 
BookMyShow Movie URL to be passed here.
<pre>bms-theatre-alert/routes/bms.js</pre> 

This application uses LocalStorage to manage the old data. This dashboard refreshes for very 5minutes and updates the latest in Dashboard.
