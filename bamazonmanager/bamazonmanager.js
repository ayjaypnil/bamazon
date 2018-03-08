var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require("cli-table");

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

var start = function(){
    inquirer.prompt([
        {
            name: "choices",
            type: "list",
            message: "What would you like to do?",
            choices: 
                ["View Products For Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"]
        }
    ]).then(function(answer){
        switch (answer.choices) {
          case "View Products For Sale":
            saleView();
            break;
          case "View Low Inventory":
            inventoryLow();
            break;
          case "Add to Inventory":
            inventoryAdd();
            break;
          case "Add New Product":
            productAdd();
            break;
        }
    })
}

        var saleView = function(){
            connection.query("SELECT * FROM products", function(err, res, fields) {
                for (i = 0; i < res.length; i++){
                    table.push([colors.bold(res[i].item_id), res[i].product_name, res[i].department_name, "$" + res[i].price,  res[i].stock_quantity]);
                }
                console.log(table.toString());
            }) 
        }

        
        var inventoryLow = function() {
        console.log("View Low Inventory");
        }
        var inventoryAdd = function() {
        console.log("Add to Inventory");
        }
        var productAdd = function() {
        console.log("Add New Product");
        };



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



// instantiate
var table = new Table({
  head: ["ID", "Product", "Department", "Price", "Stock"],
  colWidths: []
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends
