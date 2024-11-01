const express = require('express');
// const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5500' 
}));

const URL = "https://letterboxd.com/film/dilwale-2015/"

app.get('/movieDetails',async (req,res) =>{
    const html = await fetch(URL).then(response => response.text()).then((html) => { return html });

    let $ = cheerio.load(html)

    const title = $('h1[class="headline-1 filmtitle"]>span').text()
    const rating = $('a.display-rating').text()
    const releaseYear = $('div.releaseyear > a').text()
    let desc = $('div[class="truncate"]>p').text()
    let director = $('a[class="contributor"]>span').text()
    let castList = [];
        $('div.cast-list.text-sluglist a.text-slug').each((i, elem) => {
            const actor = $(elem).text();
            castList.push(actor);
        });

    let reviews = [];
    let count = $('div[class="body-text -prose collapsible-text"] > p').length ; 
    // for(let i = 0;i<count;i++){

    // }
    $('div[class="body-text -prose collapsible-text"] > p').each((i,elem)=>{
        let review = $(elem).text();
        reviews.push(review)
    })
    console.log(reviews)
    res.send({
        "title":title,
        "desc":desc,
        "director":director,
        "releaseYear":releaseYear,
        "casts" : castList
    })
})

app.listen(PORT,()=>{
    console.log("server running")
})