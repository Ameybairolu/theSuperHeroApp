
class ScrollToView {
    _parentElement = document.querySelector('.highlighted');


    // Logic for smooth scrolling in different sections of highlighted hero
    addScrollToEvent() {
        this._parentElement.addEventListener('click', function (e) {
            const selectButton = e.target.closest('button');
            if (selectButton) {
                const idSelected = selectButton.dataset.to;
                document.querySelector(`#${idSelected}`).scrollIntoView({ behavior: 'smooth' });
            }

        }
        )
    }

}

export default new ScrollToView();