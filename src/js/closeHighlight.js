class CloseHighlights {
    _parentElement = document.querySelector('.highlighted');
    _renderFavourite = document.querySelector('.side-bar');

    /*
    This function simply helps in closing the highlighted area when the user clicks on the blurred part.
     */
    _handlerEventClose(e) {
        if (e.target.classList.contains('highlighted')) {
            this._parentElement.style.left = '-100%';
        };
    }
    addEventToClose() {
        this._parentElement.addEventListener('click', this._handlerEventClose.bind(this));
    }
}

export default new CloseHighlights();