require("dotenv").config();

module.exports={ 
    env: {
        DB_ACCESS_KEY_ID: process.env.DB_ACCESS_KEY_ID,
        DB_SECRET_ACCESS_KEY: process.env.DB_SECRET_ACCESS_KEY,
        REGION: process.env.REGION
    },
};
// const withImages = require("next-images");
// module.exports = withImages({});



