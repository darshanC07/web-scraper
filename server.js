const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

const URL = "https://www.imdb.com/title/tt4535650/?ref_=fn_al_tt_1"

app.get('/title',async (req,res) =>{
    const html = await fetch(URL)
        .then(response => response.text())
        .then((html) => { return html });

    let $ = cheerio.load(html)
    let title = $('span[class="hero__primary-text"]').text()
    // console.log(title)
    res.send(title)
    // document.getElementById("title").innerText = $('span[class="hero__primary-text"]').text()
})
// demo()
app.listen(PORT,()=>{
    console.log("server running")
})