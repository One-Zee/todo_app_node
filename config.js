module.exports = {

    PORT: process.env.PORT || 4000,
    SALT: 8,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Some_secret_token_string',
    EXPIRES_IN: 60 * 60 * 24,// expires in 24 hours
    
    //Local db config
    MONGO:{
        IP: process.env.MONGO_IP || 'localhost',
        PORT: process.env.MONGO_PORT || 27017,
        DB_NAME: process.env.DB_NAME || 'todo_db'
        //USER: process.env.MONGO_USER,
        //PASSWORD: process.env.MONGO_PASSWORD
    },
    options:{
        definition:{
            openapi:"3.0.0",
            info: {
                title: "Todo API",
                version: "1.0.0",
                description: "A Simple Express Todo API with auth"
            },
            servers: [
                {
                    url: "http://localhost:4000"
                }
            ]
        },
        apis: ["./src/routes/*.js"]
    }

};
    
