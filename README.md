# How to run

## system requirements
	
	read the package.json file for the proper Node.js version required

## install redis-server on your system

   for debian systems: apt-get install redis-server

## run redis server

	sudo redis-server
	keep the batch process running in the shell

## install the dependencies
   
   open a shell go to the project root folder and type the command: npm install

## start the server

   in the root project folder type: npm start

## API Documentation

* [GET] localhost:3000/data (get all data);
* [GET] localhost:3000/data/\<key\> (get a value in cache or update data and return a random string);
* [POST] localhost:3000/data , body: {key:<key>, value:\<value\>} (save or update a key value pair);
* [DELETE] localhost:3000/remove (remove all data);
* [DELETE] localhost:3000/remove/\<key\> (remove a value for a certain key);


## NOTES

the code is quite simple, due to time given I didn' used an ORM such us Mongoose and I prefered the simple mongodb driver. 
Furthmore the server.js file is quite long at it would be possible to split the code putting the routes handlers in another file. 

Please consider that I didn't used my work laptop and in the time given I also setted the development environment. 
