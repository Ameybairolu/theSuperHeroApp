class SearchView {
    _parentEl = document.querySelector('.search-form');
    _renderingArea = document.querySelector('.card-container');
    _renderFavourite = document.querySelector('.side-bar');
    _getMarkup(hero, i) {
        return `
            <div class="card" data-index="${i}">
                <div class="card-red">
                    <div class="image-container">
                        <img
                            src="${hero.image.url}"
                            alt="${hero.name}"
                        />
                    </div>
                </div>    
                <div class="title">${hero.name}</div>
            </div>
        `;
    }

    renderHeroSearchList(data, bool) {
        const currentRenderArea = bool ? this._renderFavourite : this._renderingArea;
        currentRenderArea.innerHTML = '';
        const btn = `<div class="close-btn-container"><button class="close-btn" style="">X</button></div>`;
        data.forEach((element, i) => {
            const html = this._getMarkup(element, i);
            currentRenderArea.insertAdjacentHTML('afterbegin', html);
        });

        if (data.length === 0) {
            const html = `<p><h1 style="text-align:center; color:white;">Nothing added to Favourites!</h1></p>`
            this._renderFavourite.insertAdjacentHTML('afterbegin', html);
        }
        if (bool) this._renderFavourite.insertAdjacentHTML('afterbegin', btn);
    }

    getQuery() {
        const query = this._parentEl.querySelector('.js-search').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentEl.querySelector('.js-search').value = '';
    }
    /* NOTE: 1. When a search query is submitted, use the handler function = controlSearchResult in controller.js to obtain search result 
    through getQuery function and display results using renderHeroSearchList function
    */
    addHandlerSearch(handler) {
        this._parentEl.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

}

export default new SearchView();