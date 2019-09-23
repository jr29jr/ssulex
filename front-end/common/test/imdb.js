
const imdb = require("../imdb.js");

(async () => {
    try {
        let imdbapi = new imdb;
        let id = await imdbapi.find_series_id("Stranger Things");
        console.log(id);
        console.log(await imdbapi.get_series_info(id));
        console.log(await imdbapi.get_episode_info(id, 1, 1));
        console.log(await imdbapi.get_episode_info(id, 1, 2));
        console.log(await imdbapi.get_episode_info(id, 1, 3));
    } catch (e) {
        console.log(e);
    } 
})();

