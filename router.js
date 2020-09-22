const express = require('express');
const request = require('request');
const collegeStation = require("./static/sample_data/717_University_Drive_TX.json");
const countyDowns = require("./static/sample_data/327_County_Downs_Road_AL.json");
const brooklineAve = require("./static/sample_data/801_South_Brookline_Avenue_OK.json");
const arkansasStreet = require("./static/sample_data/1022_Arkansas_Street_OK.json");
const eastStreet = require("./static/sample_data/1402_East_12th_Street_OK.json");
const meredithDrive = require("./static/sample_data/3913_Meredith_Drive_AL.json");
const router = express.Router();


router.get("/locations", (req, res) => {
    console.log("Received GET on /locations");
    if(req.query.address.toLowerCase() === "717 university drive"){
    	res.json(JSON.stringify(collegeStation));
    	return;
    }else if(req.query.address.toLowerCase() === "327 county downs road"){
    	res.json(JSON.stringify(countyDowns));
    	return;
    }else if(req.query.address.toLowerCase() === "801 south brookline avenue"){
    	res.json(JSON.stringify(brooklineAve));
    	return;
    }else if(req.query.address.toLowerCase() === "1022 arkansas street"){
    	res.json(JSON.stringify(arkansasStreet));
    	return;
    }else if(req.query.address.toLowerCase() === "1402 east 12th street"){
    	res.json(JSON.stringify(eastStreet));
    	return;
    }else if(req.query.address.toLowerCase() === "3913 meredith drive"){
    	res.json(JSON.stringify(meredithDrive));
    	return;
    }
    
    let query = encodeURI(`${req.query.address} ${req.query.city} ${req.query.state}`);
    request.get(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${AIzaSyAOaLbUEf85DngxQe7ukimu2vpW7atozzU}&address=${query}`, (error, response, body) => {
		if(error){
			console.error(error);
			res.send(error);
		}else{
			res.json(body);
		}
	});
});

router.get("/representatives", (req, res) => {
	console.log("Recieved GET on /representatives");
	
	request.get(`http://whoismyrepresentative.com/getall_mems.php?zip=${req.query.zipcode}&output=json`, (error, response, body) => {
		if(error){
			console.error(error);
			res.send(error);
		}else if(body.indexOf("No Data") > -1){
			res.json('{"error": "No data found"}');
		}else{
			res.json(body);
		}
	});
});

module.exports = router;
