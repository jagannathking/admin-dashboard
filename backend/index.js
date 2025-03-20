const dotenv = require('dotenv');
const app = require('./app')

dotenv.config()


// PORT
const PORT = process.env.PORT || 5001;


// server
app.listen(PORT, () => {
    console.log(`Server is runing on PORT ${PORT}`)
})