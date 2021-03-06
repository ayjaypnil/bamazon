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
               connection.query("SELECT * FROM products where stock_quantity < 6", function(err, res, fields) {
                    for (i = 0; i < res.length; i++){
                        table2.push([colors.bold(res[i].item_id), res[i].product_name, res[i].department_name, "$" + res[i].price,  res[i].stock_quantity]);
                    }
                    console.log(table2.toString());
                }) 
        }

        var inventoryAdd = function() {
            connection.query("SELECT * FROM products", function(err, res, fields) {
                    for (i = 0; i < res.length; i++){
                        table3.push([colors.bold(res[i].item_id), res[i].product_name, res[i].stock_quantity]);
                    }
                    console.log(table3.toString());
                }) 
                
                    inquirer.prompt([
                    {
                        name: "productStock",
                        type: "list",
                        message: "Which product would you like to restock?",
                        choices: [
                            "wand",
                            "broomstick",
                            "owl",
                            "trunk",
                            "sword",
                            "crossbow",
                            "horse",
                            "trebuchet",
                            "skateboard",
                            "bicycle",
                            "motorcycle",
                            "car",
                            "mike"
                        ]
                    },
                    {
                        name: "amountStock",
                        type: "string",
                        message: "How many units would you like to restock?"
                    }
                ]).then(function(answer) {
                    var what = answer.productStock;
                    var many = parseInt(answer.amountStock);
                    var total;
                    
                    
                    console.log(many)
                
                     connection.query("SELECT stock_quantity FROM products where product_name ='"+ what +"'", function(err, res, fields) {
                        for(i = 0; i < res.length; i++){
                            var current = parseInt(res[i].stock_quantity);
                            console.log(current);
                        }
                        // need to add the numbers together and pas throguht below to update to that. 
                        current += many;
                        console.log(current);
                     

                        connection.query("UPDATE products SET stock_quantity = '" + current + "' WHERE product_name ='" + what + "'", function(err, res, fields) {
                            if (err) throw err;
                        }) 
                })
            
                })
        }

        var productAdd = function() {
            inquirer
              .prompt([
                {
                  name: "product_name",
                  type: "text",
                  message: "What is the name of the product?"
                },
                {
                  name: "department_name",
                  type: "text",
                  message:
                    "What is the department your product belongs in?"
                },
                {
                  name: "price",
                  type: "text",
                  message: "What is the price of your product"
                },
                {
                  name: "stock_quantity",
                  type: "text",
                  message: "What is the quantity of your product?"
                }
              ])
              .then(function(answers) {
                                        var product_name = answers.product_name;
                                        var department_name = answers.department_name;
                                        var price = answers.price;
                                        var stock_quantity = answers.stock_quantity;

                                        console.log(product_name);
                                        console.log(department_name);
                                        console.log(price);
                                        console.log(stock_quantity);

                                        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + product_name + "', '" + department_name + "', '" + price + "', '" + stock_quantity + "')";
                                        console.log(query);
                                        connection.query(query , function(err, res, fields) {
                                            if (err) throw err;
                                            console.log("worked");
                                        })
                                      });
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

var table2 = new Table({
  head: ["ID", "Product", "Department", "Price", "Stock"],
  colWidths: []
});

var table3 = new Table({
  head: ["ID", "Product", "Stock"],
  colWidths: []
});
