const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const db = admin.firestore();

app.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        const response = await db.collection("users").add(userJson);
        res.send(response)
    }
    catch (error) {
        res.send(error)
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}.`);
});

app.get('/read/all', async (req, res) => {
    try {
        const userRef = db.collection("users");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }
    catch (error) {
        res.send(error);
    }

})