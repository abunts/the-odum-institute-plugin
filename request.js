//using the fetch api
//requiring JSDom to add DOM support for Node
const jsdom = require("jsdom");
//requiring/defining fetch function from api
const fetch = require("node-fetch");
//creating the api to call
const api_url = 'https://odum.unc.edu/wp-json/tribe/events/v1/events';
//setting up async function
async function getAPI(api_url) {
    try {
        //storing response
        const response = await fetch(api_url);
        //storing data in json format
        var data = await response.json();
    }
    catch (error) {
        console.log(error);
    }
    //accounting for json parsing error (enpoint might be sensitive to "user-agent")
    headers: {
        Accept: 'application/json, text/plain, */*',
            'User-Agent';
    }
    return data.events;
}
//rendering event data from API
async function renderAPI(events) {
    //getting info from the api
    let infoArray
    try {
        infoArray = events.map(event => ({
            name: event.title,
            description: event.description,
            date: event.start_date,
            urlDate: {
                dateObj: new Date(event.start_date),
                month: ("0" + (dateObj.getMonth() + 1)).slice(-2),
                day: ("0" + dateObj.getDate()).slice(-2),
                year: dateObj.getFullYear(),
                newdate: year + "-" + month + "-" + day,
            },
            url: `https://odum.unc.edu/event/${event.slug}/${urlDate}`,
        }));
        console.log(infoArray);
        var dataScienceEvents = infoArray.filter((event) => {
            return event.description.includes('Introduction'); //case sensitive
        });
        //writing data to JSON file
        const fs = require('fs');
        const jsonString = JSON.stringify(dataEvents, null, 2);
        fs.writeFile('./newEvents.json', jsonString, err => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
            }
        });
    }
    catch (error) {
        console.log(error);
    }
    return infoArray;
}
renderAPI();