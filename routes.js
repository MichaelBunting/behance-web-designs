const axios = require('axios');

const behanceBaseURI = 'https://api.behance.net/v2/';
const dribbbleBaseURI = 'https://api.dribbble.com/v1/';
const dribbbleToken = `access_token=${process.env.DRIBBBLE_CLIENT_ACCESS_TOKEN}`;

const formatData = (data) => {
    let newData = [];

    data.forEach((data) => {
        if (data.projects) {
            data.projects.forEach((ele) => {
                ele.popularity = ele.stats.views;
                ele.thumb = ele.covers[404];
                ele.owner = {
                    name: `${ele.owners[0].first_name} ${ele.owners[0].last_name}`,
                    username: ele.owners[0].username
                };
                newData.push(ele);
            });
        } else {
            data.forEach((ele) => {
                ele.popularity = ele.views_count;
                ele.url = ele.html_url;
                ele.name = ele.title;
                ele.thumb = ele.images.normal;
                ele.owner = {
                    name: ele.user.name,
                    username: ele.user.username
                };
                ele.fields = Object.keys(ele.tags).map((tag, i) => {
                    return ele.tags[i];
                }).slice(0, 4);
                newData.push(ele);
            });
        }
    });

    return newData;
};

module.exports = function(app) {
    app.get('/designs/all', (req, res) => {
        let newData = [];

        const dribbbleRequest = new Promise((resolve, reject) => {
             axios.get(`${dribbbleBaseURI}/shots/?${dribbbleToken}&list=attachments&timeframe=month`)
                .then((data) => {
                    resolve(data.data);
                })
                .catch((err) => {
                    res.send(err);
                });
        });

        const behanceRequest = new Promise((resolve, reject) => {
            axios.get(`https://api.behance.net/v2/projects?client_id=${process.env.BEHANCE_API_KEY}&time=month`)
                .then((data) => {
                    resolve(data.data);
                })
                .catch((err) => {
                    res.send(error);
                });
        });

        Promise.all([dribbbleRequest, behanceRequest])
                .then((data) => {
                    res.send(formatData(data));
                });
    });

    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/www/index.html');
    });
}