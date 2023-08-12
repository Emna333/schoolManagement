//import app from backend/app
const app =require('./backend/app');
//server is listening on port 3002
//http://localhost:3002

app.listen(3002 , () => {
    console.log('express server is listening on port 3002...')
    //message pour verifier l serveur yemchi
})