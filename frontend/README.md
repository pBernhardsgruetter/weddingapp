Frontend quickstart
===

To install all dependencies

    go to the folder PcapWebapp\Develop\Webapp\bst\frontend
    bower install
    grunt serve
   
Additional information
---

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

API quickstart
===

Clear mongodb
  
    mongo
    use pcapBstDb
    db.dropDatabase()
    
Install all dependencies

    go to the folder PcapWebapp\Develop\Webapp\bst\server
    npm install
    npm install -g nodemon
    
## Run

Run `node api` for running the API   
or run `nodemon api` for running the API with monitoring  
 
 
## Login

There are two users for testing:

     Email: systemadmin@test.ch, Password: password 
     Email: user@test.ch, Password: password 
     






