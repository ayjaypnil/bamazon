var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",
  password: "",

  database: "bamazon_customer"
});

connection.connect(function(err) {
  if (err) throw err;
  
  start();
});



var start = function() {

    connection.query("SELECT * FROM products", function(err, res) {
        for (i = 0; i < res.length; i++) {
          console.log(colors.bold(res[i].item_id) + ": " + colors.blue(res[i].product_name) + " costs $" + res[i].price);
        }
    
        inquirer.prompt([
            {
                name: "productID",
                type: "string",
                message: "Which product would you like to buy?"
            },
            {
                name: "productAmt",
                type: "string",
                message: "How many units would you like to buy?"
            }
        ]).then(function(answer) {
            var buyAmt = answer.productAmt;
            var quantity = res[answer.productID].stock_quantity;
            var newQ = quantity - buyAmt;
            var price = res[answer.productID].price;
            var totalPrice = price * buyAmt;
            

            if (buyAmt > quantity){
                console.log("Insufficient Quantity!".red);
            
            } else {
                console.log(("Your Total is: $" + totalPrice).green);
                connection.query("UPDATE products SET stock_quantity = " + newQ + " WHERE item_id = " + answer.productID + ";", function(err, res) {
                    if (err) throw err;
                    
                })
            } 
        
        })  
    })
}

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red"
});
