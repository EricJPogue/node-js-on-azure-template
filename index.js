const express = require('express')
app = express()

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About web page.')
})

// Return the value of 2 plus 2.
app.get('/2plus2', (request, response) => {
	console.log('Calling "/2plus2" on the Node.js server.')
	response.type('text/plain')
	response.send('4')
})

// Add x and y which are both passed in on the URL. 
app.get('/add-two-integers', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})

// Possible template for calculating BMI using height in feet/inches and weight in pounds.
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightFeet = parseInt(inputs.feet)
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)

	console.log('Height:' + heightFeet + '\'' + heightInches + '\"')
	console.log('Weight:' + weight + ' lbs.')

	// Todo: Implement unit conversions and BMI calculations.
	// Todo: Return BMI instead of Todo message.

	response.type('text/plain')
	response.send('Todo: Implement "/calculate-bmi"')
})

// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// custom 404 page
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// custom 500 page
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)


