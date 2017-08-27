var http     = require('http'),
express  = require('express'),
mysql    = require('mysql')
parser   = require('body-parser');

// Database Connection
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'admin',
database : 'dev'
});
try {
connection.connect();

} catch(e) {
console.log('Database Connetion failed:' + e);
}


// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.set('port', process.env.PORT || 3000);

// Set default route
app.get('/', function (req, res) {
    res.send('<html><body><p>Welcome to Invoice App</p></body></html>');
});


app.post('/invoice/add', function (req,res) {
var response = [];
	if (
		typeof req.body.name !== 'undefined' && 
		typeof req.body.email !== 'undefined' && 
		typeof req.body.date !== 'undefined' &&
		typeof req.body.lineItems !== 'undefined' &&
		typeof req.body.total !== 'undefined'
	){
		var lineItemsUI = [];
		var name = req.body.name, email = req.body.email, date = req.body.date, lineItems = req.body.lineItems, invoice_id, total = req.body.total;
		
		connection.query('INSERT INTO invoice (cust_name, cust_email, invoice_date, total) VALUES (?, ?, ?, ?)', [name, email, date, total], function(err, result) {
			if (err)
				console.log(err);
			else {
				console.log("Invoice item inserted");
				invoice_id = result.insertId;
				for(var i=0; i<lineItems.length; i++) {
					var amount = parseFloat(lineItems[i].amount), description = lineItems[i].desc;
					connection.query('INSERT INTO lineitem (description, amount, invoice_id) VALUES (?, ?, ?)', [description, amount, invoice_id], function(err, result) {
						if (err)
							console.log(err)
						else
							console.log("line items inserted");
					});
				}
			}
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(response));
		});

		console.log("in ");
	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(JSON.stringify(response));
	}
});
// Create server
http.createServer(app).listen(app.get('port'), function(){
console.log('Server listening on port ' + app.get('port'));
});
