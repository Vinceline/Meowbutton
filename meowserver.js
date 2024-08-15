const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'meowbutton.html'));
});

const catFunFacts = [
    "A group of cats is called a 'clowder.'", 
    "Cats can't taste sweetness due to a genetic mutation.", 
    "Cats were introduced into the Americas for pest control in the 1750s.", 
    "Cats only meow as a way to communicate with humans.", 
    "Cats can recognize your voice, so they might just be ignoring you.", 
    "The oldest cat video is from 1894 and is called 'Boxing Cats.'", 
    "In ancient Egypt, family members would shave off their eyebrows in mourning when a cat died.", 
    "Cats can solve difficult cognitive problems when they feel like it.", 
    "Abraham Lincoln kept three cats in the White House.", 
    "Only 86% of U.S. cats are spayed or neutered.", 
    "Cats spend nearly 1/3rd of their lives cleaning themselves.", 
    "The oldest cat ever lived for 38 years.", 
    "Cats can drink seawater as their kidneys filter out the salt.", 
    "Most adult cats are lactose intolerant, contrary to popular belief.", 
    "Cats can make more than 100 different sounds.", 
    "Cats have 473 taste buds on their tongues!"
];

const catMemes = [
    "cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg", 
    "cat6.jpg", "cat7.jpg", "cat8.jpg", "cat9.jpg", "cat10.jpg", 
    "cat11.jpg", "cat12.jpg", "cat13.jpg", "cat14.jpg", "cat15.jpg", 
    "cat16.jpg", "cat17.jpg", "cat18.jpg", "cat19.jpg", "cat20.jpg", 
    "cat21.jpg", "cat22.jpg", "cat23.jpg"
];

let factIndex = 0;
let memeIndex = 0;
let toggle = true;

app.get('/meow', async (req, res) => {
    try {
        let data = {};

        if (toggle) {
            const catImageResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
            data = {
                type: 'fact_with_api_image',
                fact: catFunFacts[factIndex],
                imageUrl: catImageResponse.data[0].url
            };
            factIndex = (factIndex + 1) % catFunFacts.length;
        } else {
            data = {
                type: 'local_image',
                imageUrl: catMemes[memeIndex]
            };
            memeIndex = (memeIndex + 1) % catMemes.length;
        }

        toggle = !toggle; 

        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching cat content');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

