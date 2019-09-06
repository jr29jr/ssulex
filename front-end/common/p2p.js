
let parse_movie = filename => {
    let ret = filename.match(/^(?<title>.+)(?<year>19\d+|20\d+).*-(?<group>[^.]+)/);
    if (ret && ret.groups.year)
        return {
            type:       "movie",
            title:      ret.groups.title.replace(/\./g, " ").trim(),
            year:       parseInt(ret.groups.year),
            group:      ret.groups.group
        };
};

let parse_tv = filename => {
    let ret = filename.match(/^(?<title>.+?)(?:S(?<season>\d+)){0,1}E(?<episode>\d+).+-(?<group>[^.]+)/);
    if (ret && ret.groups.episode)
        return {
            type:       "tv",
            title:      ret.groups.title.replace(/\./g, " ").trim(),
            season:     ret.groups.season ? parseInt(ret.groups.season) : 1,
            episode:    parseInt(ret.groups.episode),
            group:      ret.groups.group
        };
};

let parse_release = filename => {
    let ret;
    if (ret = parse_tv(filename))
        return ret;
    if (ret = parse_movie(filename))
        return ret;
    throw `${filename} is against P2P naming rules.`;
};

module.exports = { parse_movie, parse_tv, parse_release };

