const express = require('express');
// const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5500' 
}));

const URL = "https://www.imdb.com/title/tt4535650/?ref_=fn_al_tt_1"

app.get('/movieDetails',async (req,res) =>{
    const html = await fetch(URL).then(response => response.text()).then((html) => { return html });

    let $ = cheerio.load(html)

    let title = $('span[class="hero__primary-text"]').text()
    let rating = $('span[class="sc-d541859f-1 imUuxf"]').text()
    let categories = $('span[class="ipc-chip__text"]').text()
    let desc = $('p[class="sc-fbb3c9a4-3 imgRSe"]>span[class="sc-fbb3c9a4-1 caMeWq"]').text()
    let director = $('a[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]').text()
    
    res.send({
        "title":title,
        "rating":rating,
        "categories":categories,
        "desc":desc,
        "director":director
    })
})

app.listen(PORT,()=>{
    console.log("server running")
})