const express = require('express');
// const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const dilwaleURL = "https://letterboxd.com/film/dilwale-2015/"
const socialNetwork = "https://www.imdb.com/title/tt1285016/reviews/?ref_=tt_ov_urv"

app.get('/movieDetails',async (req,res) =>{
    let html = await fetch(dilwaleURL).then(response => response.text()).then((html) => { return html });

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

    $('div[class="body-text -prose collapsible-text"] > p').each((i,elem)=>{
        let review = $(elem).text();
        reviews.push(review)
    })
    // console.log(reviews)
    res.send({
        "title":title,
        "desc":desc,
        "director":director,
        "releaseYear":releaseYear,
        "casts" : castList
    })
})

app.get('/movieReviews',async (req,res)=>{
    let html = await fetch(socialNetwork).then(response => response.text()).then((html) => { return html });

    let $ = cheerio.load(html)
    
    let title = $('h2[class="sc-b8cc654b-9 dmvgRY"]').text()
    let reviewsTitle = [];
    let reviews = [];
    //for getting all review titles 
    $('article[class="sc-f53ace6f-1 cHwTOl user-review-item"]>div>div>div[class="sc-a2ac93e5-5 feMBGz"]>div>a>h3').each((i,elem)=>{
        let reviewTitle = $(elem).text()
        reviewsTitle.push(reviewTitle)
    })

    //for getting actual review text
    $('div[class="ipc-html-content-inner-div"]').each((i,elem)=>{
        let reviewText = $(elem).text()
        // console.log(reviewText)
        reviews.push(reviewText)
    })
    res.send({
        "title" : title,
        "reviewTitle" : reviewsTitle,
        "reviews" : reviews
    }
    )
})

app.listen(PORT,()=>{
    console.log("server running")
})