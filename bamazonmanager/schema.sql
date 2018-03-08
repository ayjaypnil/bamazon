DROP DATABASE IF EXISTS bamazon_customer;
CREATE DATABASE bamazon_customer;

USE bamazon_customer;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (id)
);

