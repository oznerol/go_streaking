Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'sandboxdd3959e54186476b955aede11cd71562.mailgun.org',
    password: '1bfca1a5e9cac4697daf1b93c25a2e1c'
  });

  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    }
  });
});
