# Foodiepick Usage

- Install dependencies
    ```
    npm install
    ```
- MongoDB
    - Create a folder in your computer named data/ for storing data
    - Run the following code to connect to the database
        ```
        mongod --dbpath <path of the data folder>     
        (eg. mongod --dbpath e:\foodiepick\backend\data)
        ```
- Backend Server
    - Start running the server
        ```
        npm start
        ``` 
    - Please read the 4 models in the models/ folder
- Postman
    - Download postman for testing the RESTful APIs
    - Test GET, PUT, POST, DELETE operations for each model
        ```
        127.0.0.1:3000/foods/
        ```