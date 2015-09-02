var config = {};
var $ = require('./resources/jquery.min.js');
if (window.location.hash) {
  config = JSON.parse(decodeURI(window.location.hash.substring(1)));
  console.log('Yes config\n' + JSON.stringify(config));
  $('#heading').text(config.heading);
  config.systems.forEach(function(system) {
    var inputName = system.tag;
    $('#systems').append(
      $('<div class="form-group">')
      .append($('<label for="' + inputName + '" class="col-sm-3 control-label">').text(system.heading))
      .append($('<div class="col-sm-9">')
        .append($('<input id="' + inputName + '" type="text" class="form-control" placeholder="' + system.placeholder + '" onkeyup="enterCheck(event, this, goToTicket)">')))
    );
  });
} else {
  alert('No config found')
}

/** Run function f with DOM element o if enter is pressed */
function enterCheck(e, o, f) {
  var charCode = (typeof e.which === 'number') ? e.which : e.keyCode;
  if (charCode === 13) f(o);
}

function goToTicket(o) {
  var service = config.systems.filter(function(system) {
    return system.tag === o.id;
  })[0];
  var link = service.prefix + o.value + service.suffix;
  require('shell').openExternal(link);
}
