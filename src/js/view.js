class View {
    _highlights = document.querySelector('.highlighted');
    _renderingArea = document.querySelector('.card-container');
    _renderFavourite = document.querySelector('.side-bar');

    // NOTE: Spinner animation when loading data
    renderSpinner(bool = false) {
        const currMain = bool ? this._renderFavourite : this._renderingArea;
        currMain.innerHTML = '';
        const markup = `
        <div class="spinner">
          <img src="https://icons.veryicon.com/png/o/system/bicolor-line-icon/loading-20.png">
        </div>
        `;
        currMain.insertAdjacentHTML('afterbegin', markup);
    }

    // NOTE: Display error message
    showError(errorString = 'There was an error while trying to fetch your request. Please enter another search query!', bool = false) {
        const currMain = bool ? this._renderFavourite : this._renderingArea;
        currMain.innerHTML = '';
        const markup = `
        <p>
            <h1 style="margin:auto;">${errorString}</h1>
        </p>
        `;
        currMain.insertAdjacentHTML('afterbegin', markup);
    }

    // NOTE: Animations when hovering over a hero-card
    addCardHoverHandler() {
        this._renderingArea.addEventListener('mouseover', function (e) {
            e.preventDefault();
            const cardHovered = e.target.closest('.card');
            if (cardHovered?.classList.contains('card')) {
                cardHovered.querySelector('.card-red').classList.add('card-red-hover');
                cardHovered.querySelector('img').classList.add('img-hover');
            };

        });
        this._renderingArea.addEventListener('mouseout', function (e) {
            e.preventDefault();
            const cardHovered = e.target.closest('.card');
            if (cardHovered?.classList.contains('card')) {
                cardHovered.querySelector('.card-red').classList.remove('card-red-hover');
                cardHovered.querySelector('img').classList.remove('img-hover');
            };

        });
        this._renderFavourite.addEventListener('mouseover', function (e) {
            e.preventDefault();
            const cardHovered = e.target.closest('.card');
            if (cardHovered?.classList.contains('card')) {
                cardHovered.querySelector('.card-red').classList.add('card-red-hover');
                cardHovered.querySelector('img').classList.add('img-hover');
            };

        });
        this._renderFavourite.addEventListener('mouseout', function (e) {
            e.preventDefault();
            const cardHovered = e.target.closest('.card');
            if (cardHovered?.classList.contains('card')) {
                cardHovered.querySelector('.card-red').classList.remove('card-red-hover');
                cardHovered.querySelector('img').classList.remove('img-hover');
            };

        });
    }
    // NOTE: When the user clicks on the 'Escape' key, remove highlighted view and side-bar view from the screen
    _removeFavouritesAndHighlights(e) {
        if (e.code === 'Escape') {
            this._renderFavourite.style.right = '-100%';
            this._highlights.style.left = '-100%';
        }
    }

    addHandlerToCloseFavouritesAndHighlights() {
        document.querySelector('body').addEventListener('keydown', this._removeFavouritesAndHighlights.bind(this));
    }

}

export default new View();