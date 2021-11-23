const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

//sources
const sources = [
    {
        name: "NintendoLife",
        address: 'https://www.nintendolife.com/',
        base: 'https://nintendolife.com/'
    },

    {
        name: "NintendoWhatsnew",
        address: 'https://www.nintendo.com/whatsnew/',
        base: ''
    },

    {
        name: "NintendoNews",
        address: 'https://nintendonews.com/',
        base: 'https://nintendonews.com/'
    },

    {
        name: "MyNintendoNews",
        address: "https://mynintendonews.com/",
        base: ''
    },

    {
        name: "Kotaku",
        address: "https://kotaku.com/",
        base: ''
    },

    {
        name: "Comicbook.com",
        address: "https://comicbook.com/",
        base: ''
    },
    {
        name: "GameRant",
        address: "https://gamerant.com/",
        base: ''
    },
    {
        name: "NintendoEverything",
        address: "https://nintendoeverything.com/",
        base: ''
    }
]

//arrays
const zeldaArticles = [];
const marioArticles = [];
const metroidArticles = [];

//zelda articles
sources.forEach(source => {
    axios.get(source.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('a:contains("Zelda"), a:contains("Ocarina of Time")', html).each(function (){
                const text = $(this).text();
                const url = $(this).attr('href');
                
                zeldaArticles.push({
                    text,
                    url: source.base + url,
                    source: source.name,
                    link: source.address
                })
            })


        })
})
//mario articles
sources.forEach(source => {
    axios.get(source.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('a:contains("Mario"), a:contains("Super Mario")', html).each(function (){
                const text = $(this).text();
                const url = $(this).attr('href');
                
                marioArticles.push({
                    text,
                    url: source.base + url,
                    source: source.name,
                    link: source.address
                })
            })


        })
})
//metroid articles
sources.forEach(source => {
    axios.get(source.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            
            $('a:contains("Metroid"), a:contains("Samus")', html).each(function (){
                const text = $(this).text();
                const url = $(this).attr('href');
                
                metroidArticles.push({
                    text,
                    url: source.base + url,
                    source: source.name,
                    link: source.address
                })
            })


        })
})

//paths
app.get('/', (req, res) => {
    res.json("Welcome to my new API")
})

app.get('/zelda', (req, res) => {
    res.json(zeldaArticles)
})

app.get('/mario', (req, res) => {
    res.json(marioArticles)
})

app.get('/metroid', (req, res) => {
    res.json(metroidArticles)
})

//specific site paths

app.get("/zelda/:sourceId", (req, res) => {
    const sourceId = req.params.sourceId
    console.log(req.params)

    const sourceAddress = sources.filter(source => source.name == sourceId)[0].address
    const sourceBase = sources.filter(source => source.name == sourceId)[0].base

    axios.get(sourceAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("Zelda"), a:contains("Ocarina of Time")', html).each(function () {
                const text = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    text,
                    url: sourceBase + url,
                    source: sourceId,
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.get("/mario/:sourceId", (req, res) => {
    const sourceId = req.params.sourceId
    console.log(req.params)

    const sourceAddress = sources.filter(source => source.name == sourceId)[0].address
    const sourceBase = sources.filter(source => source.name == sourceId)[0].base

    axios.get(sourceAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("Mario"), a:contains("Super Mario")', html).each(function () {
                const text = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    text,
                    url: sourceBase + url,
                    source: sourceId,
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.get("/metroid/:sourceId", (req, res) => {
    const sourceId = req.params.sourceId
    console.log(req.params)

    const sourceAddress = sources.filter(source => source.name == sourceId)[0].address
    const sourceBase = sources.filter(source => source.name == sourceId)[0].base

    axios.get(sourceAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("Metroid"), a:contains("Samus")', html).each(function () {
                const text = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    text,
                    url: sourceBase + url,
                    source: sourceId,
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})


//Listener
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))