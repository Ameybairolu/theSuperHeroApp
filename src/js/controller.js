import searchView from './searchView.js';
import * as model from './model.js';
import View from './view.js';
import CardClickView from './cardClickView.js';
import ScrollToView from './scrollToView.js';
import AddToFavourites from './addToFavourites.js';
import CloseHighlight from './closeHighlight.js';
import FavouritesBehaviour from './favouritesBehaviour.js';


/* All the functions here are required to support each feature. 
The controller acts like a medium between model.js and every other .js files,
in order to transfer data from model to other files and vice-versa */

const controlSearchResults = async function () {
    try {

        View.renderSpinner();
        // Get search query from search bar
        const query = searchView.getQuery();

        // Return if nothing entered or characters less than 3
        if (!query || query.length < 3) throw new Error('Number of characters entered has to be at least 3');

        // Save search Results
        await model.loadSearchResults(query);

        // Display search results
        searchView.renderHeroSearchList(model.state.search.results);
    } catch (err) {
        View.showError(err);
    }
}

const controlClickedHandler = async function (card, bool = false) {
    try {
        const i = +card.dataset.index;
        const favouriteCard = bool ? await model.loadSearchResults(model.state.bookmarks[i], true) : [];

        const data = bool ? favouriteCard : model.state.search.results[i];


        const presentInBookmarks = bool ? true : model.state.bookmarks.includes(+model.state.search.results[i].id);

        return [data, _addDisplayDetailsEventListeners, presentInBookmarks];
    } catch (err) {
        console.log(err);
    }
}

const _addDisplayDetailsEventListeners = function () {
    ScrollToView.addScrollToEvent();
    AddToFavourites.addFavouriteEventHandler(_updateFavourites);
}

const _updateFavourites = function (id) {
    model.addIdToBookmarks(+id);
    controlDisplayFavourites();
}


const controlDisplayFavourites = async function () {
    try {
        View.renderSpinner(true);
        const allFavs = await Promise.all(model.state.bookmarks.map(async (item) => {
            return await model.loadSearchResults(item, true);
        }));
        searchView.renderHeroSearchList(allFavs, true);

    } catch (e) {
        View.showError('Couldnt display Favourites', true);
    }
}

//NOTE: _setLocalStorage and _getLocalStorage are required to store data in localstorage and obtain data from it

function _setLocalStorage() {
    window.addEventListener('beforeunload', () => localStorage.setItem('state', JSON.stringify(model.state)));
}

async function _getLocalStorage() {
    const data = await JSON.parse(localStorage.getItem('state'));
    if (!data) return;
    model.updateAllElementsBeforeStart(data);
}


// NOTE: Initializing event listeners and functions
const init = () => {

    _getLocalStorage();
    _setLocalStorage();

    searchView.addHandlerSearch(controlSearchResults);
    View.addCardHoverHandler();

    CardClickView.addHandlerCardClick(controlClickedHandler);
    CloseHighlight.addEventToClose();

    FavouritesBehaviour.addListenerToFavourites(controlDisplayFavourites);

    View.addHandlerToCloseFavouritesAndHighlights();

}

init();