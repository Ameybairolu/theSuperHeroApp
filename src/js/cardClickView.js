class CardClickView {
    _renderingArea = document.querySelector('.card-container');
    _renderMoreDetailsArea = document.querySelector('.highlighted');
    _renderFavourite = document.querySelector('.side-bar');

    //NOTE: When a hero-card is clicked, we need to highlight it. The below function helps get the entire HTML required
    // in order to display the details of the highlighted card.
    _getHTML(data, presentInBookmarks) {
        this._renderMoreDetailsArea.innerHTML = '';
        this._renderMoreDetailsArea.style.left = '0%';
        const markup = `<div class="content-holder">
          <div class="overview">
            <section class="image-display">
              <div class="buttons">
                <button data-to="powerstats" class="btn-shine">Powerstats</button>
                <button data-to="appearance" class="btn-shine">Appearance</button>
                <button data-to="biography" class="btn-shine">Biography</button>
                <button data-to="work" class="btn-shine">Work</button>
              </div>
              <img
                src="${data.image.url}"
                alt="${data.name}"
              />
              <h1 data-id="${data.id}" class="addToBookmark ${presentInBookmarks ? 'bookmarked' : ''}">${data.name}</h1>
            </section>
            <section class="basic-info">
              <div class="details" id="powerstats">
                <h1>Powerstats</h1>
                <div>
                    <div>
                        <h3>Combat: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.combat}%">
                                <div class="skill-name">${data.powerstats.combat}</div>
                            </div>
                        </div>
                    </div>
                        <br>
                    <div>
                        <h3>Durability: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.durability}%">
                                <div class="skill-name">${data.powerstats.durability}</div>
                            </div>
                        </div>
                    </div>
                        <br>
                    <div>
                        <h3>Intelligence: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.intelligence}%">
                                <div class="skill-name">${data.powerstats.intelligence}</div>
                            </div>
                        </div>
                    </div>
                        <br>
                    <div>
                        <h3>Power: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.power}%">
                                <div class="skill-name">${data.powerstats.power}</div>
                            </div>
                        </div>
                    </div>
                        <br>
                    <div>
                        <h3>Speed: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.speed}%">
                                <div class="skill-name">${data.powerstats.speed}</div>
                            </div>
                        </div>
                    </div>
                        <br>
                    <div>
                        <h3>Strength: </h3>
                        <div class="skill-button">
                            <div id="java" class="common-button" style="width:${data.powerstats.strength}%">
                                <div class="skill-name">${data.powerstats.strength}</div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="details" id="appearance">
                <h1>Appearance</h1>
                <div>
                    <h3>Gender: ${data.appearance.gender}</h3>
                    <h3>Height: ${data.appearance.height[0] === '-' ? '-' : data.appearance.height[1]}</h3>
                    <h3>Weight: ${data.appearance.weight[0].includes("-") ? '-' : data.appearance.weight[1]}</h3>
                    <h3>Eye-color: ${data.appearance['eye-color']}</h3>
                    <h3>Hair-color: ${data.appearance['hair-color']}</h3>
                    <h3>Race: ${data.appearance.race}</h3>
                </div>
              </div>
              <div class="details" id="biography">
                <h1>Biography</h1>
                <div>
                    <h3>Full-name: ${data.biography['full-name']}</h3>
                    <h3>Place-of-birth: ${data.biography['place-of-birth']}</h3>
                    <h3>First-appearance: ${data.biography['first-appearance']}</h3>
                    <h3>Publisher: ${data.biography.publisher}</h3>
                    <h3>Alignment: ${data.biography.alignment}</h3>
                    <h3>Alter-egos: ${data.biography['alter-egos']}</h3>
                </div>
              </div>
              <div class="details" id="work">
                <h1>Work</h1>
                <div>
                    <h3>Occupation: ${data.work.occupation}</h3>
                    <h3>Base: ${data.work.base}</h3>
                </div>
              </div>
            </section>
          </div>
        </div>`;
        this._renderMoreDetailsArea.insertAdjacentHTML('afterbegin', markup);
    }

    /* NOTE: The below function helps display the highlighted window and then obtains data using the handler function
     which in this case is controlclickedhandler function in controller.js, which in turn obtains the required
     data from the model's state object.
     We send the data to _getHTML function which displays the data in required format.*/

    async _renderDescription(handler, bool, e) {
        if (e.target.classList.contains('close-btn')) {
            this._renderFavourite.style.right = '-100%';
            return;
        }
        const cardClicked = e.target.closest('.card');
        if (cardClicked) {
            const [data, eventListenerAddFunction, presentInBookmarks] = await handler(cardClicked, bool);
            this._getHTML(data, presentInBookmarks);
            eventListenerAddFunction();
        }
    }

    addHandlerCardClick(handler) {
        this._renderingArea.addEventListener('click', this._renderDescription.bind(this, handler, false));
        this._renderFavourite.addEventListener('click', this._renderDescription.bind(this, handler, true));
    }
}

export default new CardClickView();