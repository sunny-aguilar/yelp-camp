// remove all campgrounds & add seed data

// pull in required modules
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');


// see data
const data = [
    {
        name: 'Putah Creek',
        image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
        description: 'Putah Creek (Patwin: Liwaito) is a major stream in Northern California, a tributary of the Yolo Bypass, and ultimately, the Sacramento River.',
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: 'Lake Solano',
        image: 'https://images.pexels.com/photos/354611/pexels-photo-354611.jpeg',
        description: 'Lake Solano is a reservoir formed by Putah Diversion Dam impounding Putah Creek, located in the Vaca Mountains within Yolo County and northern Solano County, California.',
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        name: 'Lake Berryesa',
        image: 'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg',
        description: 'Lake Berryessa is the largest lake in Napa County, California. This reservoir in the Vaca Mountains was formed following the construction of the Monticello Dam on Putah Creek in the 1950s.',
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    },
    {
        name: 'American River',
        image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
        description: 'The North Fork American River is the longest branch of the American River in Northern California. It is 88 miles long from its source at the crest of the Sierra Nevada, near Lake Tahoe, to its mouth at Folsom Lake northeast of Sacramento.',
        author:{
            id : "f88c2e093403d111454fff77",
            username: "Doe"
        }
    },
    {
        name: 'Sacramento River',
        image: 'https://images.pexels.com/photos/349732/pexels-photo-349732.jpeg',
        description: 'The Sacramento River is the principal river of Northern California in the United States, and is the largest river in California. Rising in the Klamath Mountains, the river flows south for 400 miles before reaching the Sacramento–San Joaquin River Delta and San Francisco Bay.',
        author:{
            id : "f99c2e093403d111454fff77",
            username: "Barry"
        }
    },
    {
        name: 'Folsom Lake',
        image: 'https://images.pexels.com/photos/619950/pexels-photo-619950.jpeg',
        description: 'Folsom Lake is a reservoir on the American River in the Sierra Nevada foothills of California, United States. It is located within Placer, El Dorado, and Sacramento counties. It is about 25 mi northeast of Sacramento.',
        author:{
            id : "f54c2e093403d111454fff77",
            username: "Floof"
        }
    },
    {
        name: 'Cache Creek',
        image: 'https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg',
        description: 'Cache Creek is an 87-mile-long stream in Lake, Colusa and Yolo counties, California.',
        author:{
            id : "z00c2e093403d111454fff77",
            username: "Darius"
        }
    },
    {
        name: 'South Lake Tahoe',
        image: 'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg',
        description: 'South Lake Tahoe is a California resort city on Lake Tahoe, in the Sierra Nevada mountains. It’s known for nearby ski resorts and beaches, like El Dorado Beach, with its picnic areas. The city’s restaurants and bars merge with the casinos of adjacent Stateline, Nevada. Van Sickle Bi-State Park has wooded trails and lake views. West of the city, Emerald Bay State Park includes Vikingsholm, a 1929 Nordic-style mansion.',
        author:{
            id : "f88c2c269403d111cc4fff77",
            username: "Paris"
        }
    }
];

// remove and add campgrounds
function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Removed campgrounds!');

            // add a campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Added a campground.');

                        // create commends
                        Comment.create(
                            {
                                text: 'This is a comment',
                                author: 'Homer'
                            },
                            function(err, comment) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log('Created new comment.');
                                    campground.comments.push(comment._id);
                                    campground.save();
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

// export function
module.exports = seedDB;