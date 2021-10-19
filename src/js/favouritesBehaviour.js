class FavouritesBehaviour {
    _parentElement = document.querySelector('.side-bar');
    _buttonFavourites = document.querySelector('header').querySelector('button');

    /* 
    NOTE: When we click on the favourites button, we need to display the side-bar. This is achieved using the below function.
    The handler function is controlDisplayFavourites in controller.js, which only helps in displaying the bookmarked elements,
    which in turn takes help from searchView's renderHeroSearchList function to render data.
    */

    _decideSideBarBehaviour(handler) {
        this._parentElement.innerHTML = '';
        this._parentElement.style.right = '0%';

        handler();
    }

    addListenerToFavourites(handler) {
        this._buttonFavourites.addEventListener('click', this._decideSideBarBehaviour.bind(this, handler));
    }
}

export default new FavouritesBehaviour();