const router = require('express').Router();
let Users = require('../models/user.model');

const fs = require('fs');


router.use( function (req, res, next) {
    console.log(req.url, '@' ,Date.now());
    next();
});

router.route('').get( (req, res) => {
    Users.findOne({_id: req.query.id})
    .then(async user => {
        if(user == null){

            res.status(400).json('Not a valid user.')

        } else {
            var recommendations = [];
            const artistList = user.following_list;
            let rawdata = fs.readFileSync('./recommender_model.json');
            let recommendationModel = JSON.parse(rawdata);
            const model = recommendationModel.frequent_sets

            var i = 0;

            while(model[i].items.length <= 1){
                i += 1;
            };
            // i contains the pointer to the index of the first non single set of items from the recommendation limit

            var artistCounter = 0;
            
            while(artistCounter < artistList.length){
                var j = i;

                while(j < model.length){
                    // console.log(j)
                    if(model[j].items.includes(artistList[artistCounter])){
                        var iterateItems = 0;
                        while(iterateItems < model[j].items.length){

                            if( artistList[artistCounter] != model[j].items[iterateItems] && !artistList.includes(model[j].items[iterateItems]) && !recommendations.includes(model[j].items[iterateItems])){   
                                    recommendations.push(model[j].items[iterateItems]);
                                    iterateItems += 1;
                                }
                            else{
                                iterateItems += 1;
                            }
                        };
                    }
                    j += 1;
                }
                artistCounter += 1;
            };

            if(recommendations.length == 0){
                var counter = 0;
                while(counter < 4){
                    recommendations.push(model[counter].items[0]);
                    counter += 1;
                };

            }

            res.json(recommendations);
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
})



module.exports = router;