//using the fetch api
//requiring JSDom to add DOM support for Node
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
//requiring/defining fetch function from api
const fetch = require("node-fetch");
//creating the api to call
const api_url = 'https://odum.unc.edu/wp-json/tribe/events/v1/events';
//making document a global variable
global.document = new JSDOM('https://odum.unc.edu/wp-json/tribe/events/v1/events').window.document;
//setting up async function
async function getAPI(api_url) {
    try {
        //storing response
        const response = await fetch(api_url);
        //storing data in json format
        var data = await response.json();
       // console.log(data.events);
    }
    catch (error) {
        console.log(error);
    }
    return data.events;
}
//fetchEvents function 
//gets and returns events 
async function fetchEvents() {
    try {
        //getting info from the api
        let info = await getAPI(api_url);
        console.log(info);
        //creating an array for the info from the api 
        //then mapping the event details to the array 
        let infoArray = info.map(event => {
              //  url = `https://odum.unc.edu/event/${event.slug}/${event.start_date}`,
            return {title: event.title, description: event.description, date: event.start_date};
        });
        return infoArray;
        //filtering through the event descriptions to only pull data science events
        /*
        var dataScienceEvents = infoArray.filter((event) => {
            return event.description.includes('mixed methods'); //case sensitive
        });*/
    }
    //
    catch (error) {
        console.log(error);
    }
    //console.log(dataScienceEvents);
}
//fetchEvents()

//writing event details to a JSON file
async function writeEvents() {
    //writing data to JSON file
    const fs = require('fs');
    const dataEvents = await fetchEvents();
    const jsonString = JSON.stringify(dataEvents, null, 2);
    fs.writeFile('./newEvents.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
    console.log(dataEvents);
}
writeEvents()
/*
//add fetchEvents function: responsible for getting and returning the events
//add transformEvents function: responsible for making the response you receive "look" like the event format you want
//add writeEvents function: responsible for interacting with the file system

//final code format would look something like this:
const events = fetchEvents(),
    formattedEvents = transformEvents(events);
writeEvents(formattedEvents);


function transformEvents() {
    //
}
*/
