import { AJAX } from './helper.js';

//NOTE: All data stored in the state object
export let state = {
    search: {
        query: '',
        results: []
    },
    bookmarks: []
};

// NOTE: Obtain data and store it or return it when the data is searched through an ID

export const loadSearchResults = async function (query, bool) {
    try {
        // const link = bool ? ``
        const data = await AJAX(bool ? `https://superheroapi.com/api.php/4629652520424565/${query}` : `https://superheroapi.com/api.php/4629652520424565/search/${query}`);


        if (bool) return data;

        state.search.query = query;
        state.search.results = data.results.map(
            eachHero => {
                return {
                    id: eachHero.id,
                    name: eachHero.name,
                    appearance: eachHero.appearance,
                    biography: eachHero.biography,
                    image: eachHero.image,
                    powerstats: eachHero.powerstats,
                    connections: eachHero.connections,
                    work: eachHero.work
                }
            }
        );
    } catch (err) {
        throw new Error(`Couldn't search for your query. Please try again`);
    }
}

// NOTE: Logic to add data to bookmarks or to remove it

export const addIdToBookmarks = function (id) {
    if (state.bookmarks.includes(id)) {
        const index = state.bookmarks.indexOf(id);
        state.bookmarks.splice(index, 1);
    } else {
        state.bookmarks.push(id);
    }
}

export const updateAllElementsBeforeStart = function (data) {
    state = data;
}