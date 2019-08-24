DROP DATABASE IF EXISTS Products;

CREATE DATABASE Products;

-- USE Products;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
  id SERIAL,
  title TEXT,
  description TEXT,
  product_price DECIMAL(10,2),
  seller TEXT,
  colors TEXT[],
  PRIMARY KEY ( id )
);