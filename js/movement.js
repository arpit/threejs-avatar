function loadMovement(onSuccess){
  fetch('./data/movement.json', {
  	method: 'get'
  }).then(function(response) {
    response.json().then(body => onSuccess(body.data))
  }).catch(function(err) {
  	// Error :(
  });
}
