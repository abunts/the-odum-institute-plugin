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
    return data.events;
}
//rendering event data from API
async function renderAPI(events) {
    //getting info from the api
    let urlDate = new Date();
    let infoArray
    try {
        infoArray = events.map(event => ({
            name: event.title,
            description: event.description,
            date: event.start_date,
            url: `https://odum.unc.edu/event/${event.slug}/${event.start_date.slice(0, 11)}`,
        }));
        console.log(infoArray);
        var dataScienceEvents = infoArray.filter((event) => {
            return event.description.includes('Data'); //case sensitive
        });
        //writing data to JSON file
        const fs = require('fs');
        const jsonString = JSON.stringify(dataScienceEvents, null, 2);
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
(async () => {
    // first, let's grab the events
    const events = await getAPI(api_url)
    // necxt, we'll put the event objects into the correct format
    // and write the events to file
    renderAPI(events)
})();
