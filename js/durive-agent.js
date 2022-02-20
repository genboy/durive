jQuery(function($) {


  var Agent = function(options) {

    //Variables
    var profile = {
      ip: '',
      device: ''
    };
    var settings = {
      theme: 'blank' //
    };

    //root.method()
    var root = this;

    //Constructor
    this.construct = function(options) {
      $.extend(settings, options);
    };

    //Public methods
    this.init = function() {
      agent();
      if (typeof window !== 'undefined') {
        root.setTheme();
      }
    };

    this.setTheme = function() {
      $('body').addClass(settings.theme);
      console.log(settings.theme);
    };

    //Private method
    var agent = function() {
      let newip = profile.ip;
      $.getJSON("https://genboy.net/durive/php/getip.php?format=json", function(data) {
        newip = data.ip;
        $.extend(profile, {
          ip: newip,
          device: navigator.userAgent
        });
        console.log(profile.ip);
        console.log(profile.device);
      });

    };

    this.construct(options);

  };

  var user = new Agent({
    theme: 'dark'
  });
  user.init();

});
