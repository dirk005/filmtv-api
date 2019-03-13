//////////////////////////////////////
// Get latest movies

const handelGetMovies = ( req , res ,request ,authKey , filmType , pageType ) => {

    let page = 1;
    let url= '';
    if (filmType === 'all'){
        url = `https://api.themoviedb.org/3/trending/${filmType}/${pageType}?api_key=${authKey}`;
    }else{
        url = `https://api.themoviedb.org/3/${filmType}/${pageType}?api_key=${authKey}&language=en-US&page=${page}`;
    }
    
    //setup headers with auth key
    var headers = {
        'Accept': 'application/json',
    };

    //Setup option with url and series ID
    var options = {
        url: url,
        headers: headers
    };
    // get the response and send it back to main site
    const callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // got response send back to page
            res.json(body);
        } else if (!error && response.statusCode === 404) {
            // send back page not found
            res.json('404')
        } else {
            // try again by resend request
            request(options, callback);
        }
    }

    // use npm package request to get the API response send options and callback receive response
    request(options, callback);

}

module.exports = {
    handelGetMovies
}