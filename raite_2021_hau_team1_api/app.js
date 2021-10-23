const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var admin = require("firebase-admin");

var serviceAccount = require("./hauteamone-firebase-adminsdk-6ggz3-30a3623bb7.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hauteamone-default-rtdb.asia-southeast1.firebasedatabase.app/"
  });

app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: '*'
}));

//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

const database = admin.database();
const crewRef = database.ref('/Crew');
const speedRef = database.ref('/Speed');
const ShipRef = database.ref('/Ship');

app.get('/', (req, res) => {
    res.send('index');
});

app.post('/save', (req, res) => {
    console.log(req.body);
    console.log("SAVING...");    
    ShipRef.child(req.body.shipName).set({
        Speed: req.body.Speed,
        origin: req.body.origin,
        destination: req.body.destination,
        Crews: {
            Captain: {
                Name: "a",
                sched: "a",
                terms:"a",
                contract: "c"
            },
            Chief_Mate: {
                Name: "b",
                sched: "b",
                terms:"b",
                contract: "b"
            },
            Second_Mate: {
                Name: "c",
                sched: "c",
                terms:"c",
                contract: "c"
            },
            Third_Mate: {
                Name: "d",
                sched: "d",
                terms:"d",
                contract: "d"
            },
            Deck_Cadet: {
                Deck_Cadet_1:{
                    Name: "e",
                    sched: "e",
                },
                Deck_Cadet_2:{
                    Name: "e",
                    sched: "e",
                },
                terms:"e",
                contract: "e"
            },
            Chief_Engineer: {
                Name: "f",
                sched: "f",
                terms:"f",
                contract: "f"
            },
            Second_Engineer: {
                Name: "g",
                sched: "g",
                terms:"g",
                contract: "g"
            },
            Third_Engineer: {
                Name: "h",
                sched: "h",
                terms:"h",
                contract: "h"
            },
            Fourth_Engineer: {
                Name: "i",
                sched: "i",
                terms:"i",
                contract: "i"
            },
            Engine_Cadet: {
                Engine_Cadet_1:{
                    Name: "j",
                    sched: "j",
                },
                Engine_Cadet_2:{
                    Name: "j",
                    sched: "j",
                },
                terms:"j",
                contract: "j"
            },
            Electrician: {
                Electrician_1:{
                    Name: "k",
                    sched: "k",
                },
                Electrician_2:{
                    Name: "k",
                    sched: "k",
                },
                Electrician_3:{
                    Name: "k",
                    sched: "k",
                },
                terms:"k",
                contract: "k"
            },
            Boatswim: {
                Name: "l",
                sched: "l",
                terms:"l",
                contract: "l"
            },
            Pumpman: {
                Pumpman_1:{
                    Name: "m",
                    sched: "m",
                },
                Pumpman_2:{
                    Name: "m",
                    sched: "m",
                },
                Pumpman_3:{
                    Name: "m",
                    sched: "m",
                },
                terms:"m",
                contract: "m"
            },
            AB: {
                AB_1:{
                    Name: "n",
                    sched: "n",
                },
                AB_2:{
                    Name: "n",
                    sched: "n",
                },
                AB_3:{
                    Name: "n",
                    sched: "n",
                },
                AB_4:{
                    Name: "n",
                    sched: "n",
                },

                terms:"n",
                contract: "n"
            },
            OS: {
                OS_1:{
                    Name: "o",
                    sched: "o",
                },
                OS_2:{
                    Name: "o",
                    sched: "o",
                },
                OS_3:{
                    Name: "o",
                    sched: "o",
                },
                OS_4:{
                    Name: "o",
                    sched: "o",
                },
                Name: "o",
                sched: "o",
                terms:"o",
                contract: "o"
            },
            Fitter: {
                Fitter_1:{
                    Name: "p",
                    sched: "p",                   
                },
                Fitter_2:{
                    Name: "p",
                    sched: "p",                   
                },
                terms:"p",
                contract: "p"
            },
            Oiler: {
                Oiler_1:{
                    Name: "q",
                    sched: "q",                   
                },
                Oiler_2:{
                    Name: "q",
                    sched: "q",                   
                },
                terms:"q",
                contract: "q"
            },
            Wipper: {
                Wipper_1:{
                    Name: "r",
                    sched: "r",                   
                },
                Wipper_2:{
                    Name: "r",
                    sched: "r",                   
                },
                terms:"r",
                contract: "r"
            },
            Chief_cook: {
                Name: "s",
                sched: "s",
                terms:"s",
                contract: "s"
            },
            Steward: {
                Steward_1:{
                    Name: "t",
                    sched: "t",                   
                },
                Steward_2:{
                    Name: "t",
                    sched: "t",                   
                },
                Steward_3:{
                    Name: "t",
                    sched: "t",                   
                },
                terms:"t",
                contract: "t"
            },

        }
    });
    res.status(200).json({message: "Successfully added"});
    console.log("Successfully added!");
});

app.get('/getShip', (req, res) => {
    ShipRef.once('value',function(snap){
    res.status(200).json(snap.val());
}) 
})

app.get('/getCrew', (req, res) => {
    crewRef.once('value',function(snap){
    res.status(200).json(snap.val());
}) 
})

app.get('/getSpeed', (req, res) => {
    speedRef.once('value',function(snap){
    res.status(200).json(snap.val());
}) 
})


app.put('/update', (req, res) => {
    console.log(req.body);
    console.log("UPDATING...");
    const newData = {
        title: req.body.title,
        description: req.body.description,
    };
    notesRef.child(req.body.note_id).update(newData);
    res.status(200).json({message: "Successfully updated"});
    console.log("Successfully updated!");
});

app.delete('/remove', (req, res) => {
    console.log(req.body);
    console.log("DELETING...");
    notesRef.child(req.body.note_id).remove();
    res.status(200).json({message: "Successfully removed"});
    console.log("Successfully removed!");
});

app.get('/getCrew', (req, res) => {
    ShipRef.once('value',function(snap){
    res.status(200).json(snap.val());
}) 
})

app.get('/getSpeed', (req, res) => {
    speedRef.once('value',function(snap){
    res.status(200).json(snap.val());
}) 
})

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});