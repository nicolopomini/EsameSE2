
const express = require('express'),
    bodyParser = require('body-parser');
const check = require('./checker');
const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
});
app.post('/check', (req, res) => {
	var url = req.body.url;
	var par = req.body.invocationParameters;
	var exdata = req.body.expectedResultData;
	var extstatus = req.body.expectedResultStatus;
	check(url, par, exdata, extstatus).then(risp => {
		res.json(risp);
	});
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});