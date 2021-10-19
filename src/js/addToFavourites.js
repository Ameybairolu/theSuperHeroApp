class AddToFavourites {
    // _parentElement = document.querySelector('.highlighted');
    _favouriteHeader;
    // NOTE: 1. In the highlighted area, when the user clicks on the header, we need to toggle 'bookmarked' class to 
    //the header to present it in a way, the user can understand the current card is bookmarked.
    // NOTE: 2. The below function also takes care that the id of the selected elements is added to 'state's bookmarks array' 

    _actionForClickOnHeader(handler, event) {
        this._favouriteHeader.classList.toggle('bookmarked');
        handler(event.target.dataset.id);
        // console.log(event.target);
    }

    addFavouriteEventHandler(handler) {
        this._favouriteHeader = document.querySelector('.image-display').querySelector('h1');
        this._favouriteHeader.addEventListener('click', this._actionForClickOnHeader.bind(this, handler));
    }

}

export default new AddToFavourites();