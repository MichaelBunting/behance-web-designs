import axios from 'axios';

var collection = require('lodash/collection');

export default {
    getProjectsDefault: () => {
        return axios.get('/designs/all')
            .then((data) => {
                let sortedDesigns = collection.sortBy(data.data, 'popularity').reverse();

                return sortedDesigns;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}