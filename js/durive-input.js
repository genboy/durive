jQuery(function($) {

  $(document).ready(function() { //$(window).load(function(){ //

    /*
    var Durive = function(options) {

      //Variables
      var input = {
        element: '#inputsource',
        value: ''
      };

    }
    */

    const inputElement = '#inputsource';

    function isValidIP(ipaddress) { // https://brightcloud.com/static/js/url-ip-lookup-page.js

      // normalize IP
      var ip = ipaddress;
      if (ipaddress.split("//").length == 1) {
        ip = ipaddress.split("//")[0];
      } else {
        ip = ipaddress.split("//")[1].split("/")[0];
      }

      // check IP 4 or 6 format :: https://stackoverflow.com/questions/23483855/javascript-regex-to-validate-ipv4-and-ipv6-address-no-hostnames
      let ipv46_regex = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;

      if (ipv46_regex.test(ip) || isBaseIP(ip) ) {
        // check if public IP
        return isPublicIP(ipaddress);
      }else{
        return false;
      }
    }

    function isBaseIP(ipAddress)
    {
       let baseIPregEx = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
       return baseIPregEx.test(ipAddress);
    }

    function isPublicIP(ip) { // https://brightcloud.com/static/js/url-ip-lookup-page.js
      let parts = ip.split('.');
      return !(parts[0] === '10' || (parts[0] === '172' && (parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31)) || (parts[0] === '192' && parts[1] === '168'));
    }

    function isValidURL(uri) { // https://brightcloud.com/static/js/url-ip-lookup-page.js
      let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        // '(\\/[-a-z\\d%_.~+!$&#\'\[()*,;:=@^><}{][*)*' + // path
        '(\\/?.*)' + // path
        '(\\?[;&-a-z!@\\d%_.~+!$=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'gi'); // fragment locator
      return !!pattern.test(uri);
    }
    function checkStringInput(input){

      if (isValidIP(input)) {

        console.log('Ip addres');

      } else if (isValidURL(input)) {

        console.log('Website addres');

      } else if (input.length > 0) {

        // string to array, check for commands (set theme <name>)
        console.log(input);

      }
    }

    $('body').on('keyup', inputElement, function(event) {

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      let input = $(inputElement).val();
      checkStringInput(input);

    });



  });

});
