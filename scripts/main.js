var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;


function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);

}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

//retrieves URL array
function getOttersArray() {
    'use strict';
    var OTTERS_ARRAY = getThumbnailsArray();
    for (var i = 0; i < OTTERS_ARRAY.length; i++) {
        OTTERS_ARRAY[i] = OTTERS_ARRAY[i].href;
    }
    return OTTERS_ARRAY;
}


function previousButton() {
    'use strict';
    var OTTERS_ARRAY = getOttersArray();
    var thumbnailArray = getThumbnailsArray();
    //retrieve element and store it in COUNTER index
    var COUNTER = OTTERS_ARRAY.indexOf(document.getElementById('detail-image').src);
    if (COUNTER === 0) {
        COUNTER = OTTERS_ARRAY.length - 1;
    } else {
        //increment
        COUNTER--;
    }

    //click and execute
    thumbnailArray[COUNTER].click();
}

function nextButton() {
    'use strict';
    var OTTERS_ARRAY = getOttersArray();
    var thumbnailArray = getThumbnailsArray();
    //retrieve element and store it in COUNTER index
    var COUNTER = OTTERS_ARRAY.indexOf(document.getElementById('detail-image').src);
    if (COUNTER > OTTERS_ARRAY.length) {
        COUNTER = 0;
        
    } else {
        //increment
        COUNTER++;
        if (COUNTER === OTTERS_ARRAY.length) {
            alert("End of thumbnails!");
        }
    }
    //click and execute
    thumbnailArray[COUNTER].click();
    
}


function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    //when clicking on previous button, call previous button function
    document.getElementById('previous').addEventListener('click', function (event) {
        event.preventDefault();
        previousButton();
    });

    //when clicking on next button, call next button function
    document.getElementById('next').addEventListener('click', function (event) {
        event.preventDefault();
        nextButton();
    });
}

initializeEvents();