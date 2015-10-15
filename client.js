var http = require('http');
var recepten = {recepten: []};
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var optionsget = {
  host: '127.0.0.1',
  port:'3000',
  path: '/api/recepts',
  method : 'GET'
};

console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

// do the GET request
var reqGet = http.request(optionsget, function(res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  console.log("headers: ", res.headers);


    res.on('data', function(d) {
        recepten=d;
        console.info('recepten filled');
        console.log(recepten.toString());
    });

});

reqGet.end();
reqGet.on('error', function(e) {
    console.error(e);
});
