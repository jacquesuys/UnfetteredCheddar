if (Meteor.isClient) {

  var bitly = new Bitly('unfetteredcheddar', 'R_517be1593c48412aa787adc7a9b166a5');

  Meteor.subscribe('giblets');
  Meteor.subscribe('notifications');

  Template.dashboard.helpers({
    giblets: function() {
      return Giblets.find().fetch();
    }
  });

  Template.dashboard.events({
    "submit .addGiblet": function (event) {

      event.preventDefault();

      // // Get values from form
      var taskname = event.target.taskname.value;
      var url = bitlify( event.target.url.value.trim() );
      var keywords  = event.target.keywords.value.split(', ');
      var SMS = event.target.SMS.checked;
      var email = event.target.email.checked;
      var frequency = event.target.frequency.value;

      console.log( bitlify( event.target.url.value.trim() ));

      var giblet = {
        taskname: taskname,
        url: url,
        keywords: keywords,
        SMS: SMS,
        email: email,
        frequency: frequency
      };

      Meteor.call('addGiblet', giblet);
    }
  });

  Template.userSettings.events({
    "submit .userSettings": function (event) {

      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var chosenName = event.target.name.value;
      var chosenPhoneNumber = event.target.phone.value;
      var chosenEmail = event.target.email.value;

      var userSettings = {
        chosenName: chosenName,
        chosenPhoneNumber: chosenPhoneNumber,
        chosenEmail: chosenEmail
      }

      Meteor.call('addUserSettings', userSettings);
    }

  });

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
  });

  var bitlify = function(url) {
    bitly.shorten(url, function(err, response) {
      if (err) throw err;
      return response.data.url
    });
  }

}
