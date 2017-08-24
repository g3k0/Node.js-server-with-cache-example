# synopsis
The application is a Node.js server that exposes REST API to interact with a MongoDB database and implements a cache system layer. 

# How to run

### system requirements
	
* Node.js version 6.11.12 or higher;
* a MongoDB instance running, version 2.6.10 or higher;

### install redis-server on your system

for debian systems: 

```sh
apt-get install redis-server
```

### run redis server

```sh
sudo redis-server
```
keep the batch process running in the shell

### install the dependencies
   
open a shell go to the project root folder and type the command: 

```sh
npm install
```

### start the server

in the root project folder type: 

```sh
npm start
```

# API Documentation

* [GET] localhost:3000/data (get all data);
* [GET] localhost:3000/data/\<key\> (get a value in cache or update data and return a random string);
* [POST] localhost:3000/data , body: {key:\<key\>, value:\<value\>} (save or update a key value pair);
* [DELETE] localhost:3000/remove (remove all data);
* [DELETE] localhost:3000/remove/\<key\> (remove a value for a certain key);


# NOTES

The code is just an example that shows how to implement a cache system with a Node.js server. 
For a real application consider to:

 * implement an ORM such as Mongoose;
 * split the config file for different environments (local, development, staging, production);
 * write unit tests;
 * configure properly the cache system;