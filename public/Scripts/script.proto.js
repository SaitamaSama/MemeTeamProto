/**
 * Since this is only a prototype
 * everything is cramped up in a
 * single file.
 * Also, no comments. :-)
 */

;(() => {
    "use strict";

    const BANNER_PAGE_ID = 'banner';

    // I really don't know what I'm doing
    let pages = {};

    class Element {
        constructor(elementName) {
            /**
             * @type {Element}
             */
            this.element = document.createElement(elementName);
        }

        bodyAppend() {
            document.body.appendChild(this.element);
        }
    }

    function qs(selector) {
        return document.querySelector(selector);
    }
    function qsA(selector) {
        return document.querySelectorAll(selector);
    }

    qsA('.page').forEach((page) => {
        pages[page.getAttribute('id')] = page;
    });

    // Create the arrows!
    let downArrow = new Element('button');
    let upArrow = new Element('button');
    downArrow.element.classList.add('nav-button');
    downArrow.element.classList.add('down');
    downArrow.element.classList.add('mdl-js-ripple-effect');
    upArrow.element.classList.add('nav-button');
    upArrow.element.classList.add('up');
    upArrow.element.classList.add('mdl-js-ripple-effect');

    downArrow.element.innerHTML = '<i class="material-icons">keyboard_arrow_down</i>';
    upArrow.element.innerHTML = '<i class="material-icons">keyboard_arrow_up</i>';

    componentHandler.upgradeElement(upArrow.element);
    componentHandler.upgradeElement(downArrow.element);

    downArrow.bodyAppend();
    upArrow.bodyAppend();

    function pageNav(pageId) {
        if(pages[pageId] == null)
            window.location.hash = 'page=' + qs('.page.active').getAttribute('id') + ';';

        if(!pages[pageId].classList.contains('active')) {
            let currentPage = qs('.page.active');
            currentPage.classList.remove('active');
            setTimeout(() => {
                // Display the page
                pages[pageId].classList.add('active');
            }, 501);
        }

        upArrow.element.style.display = 'block';
        downArrow.element.style.display = 'block';

        // Check if it is the first page
        // if true, hide upArrow
        let _pages = Array.prototype.slice.call(qsA('.page'));
        if(_pages.indexOf(pages[pageId]) == 0) {
            upArrow.element.style.display = 'none';
            downArrow.element.addEventListener('click', (e) => {
                window.location.hash = 'page=' + _pages[_pages.indexOf(pages[pageId]) + 1].getAttribute('id') + ';';
            });
        } else if(_pages.indexOf(pages[pageId]) == _pages.length - 1) {
            downArrow.element.style.display = 'none';
            upArrow.element.addEventListener('click', (e) => {
                window.location.hash = 'page=' + _pages[_pages.indexOf(pages[pageId]) - 1].getAttribute('id') + ';';
            });
        } else {
            upArrow.element.addEventListener('click', (e) => {
                window.location.hash = 'page=' + _pages[_pages.indexOf(pages[pageId]) - 1].getAttribute('id') + ';';
            });
            downArrow.element.addEventListener('click', (e) => {
                window.location.hash = 'page=' + _pages[_pages.indexOf(pages[pageId]) + 1].getAttribute('id') + ';';
            });
        }

        // Set button event listeners
    }

    function hashChange(e) {
        if(typeof e == 'object') {
            e.preventDefault();
        }

        let keyValues = {};

        let keyPairs = window.location.hash.substr(1).split(';');
        keyPairs.forEach((pairs) => {
            let temp = pairs.split('=');
            if(temp[0] != '')
                keyValues[temp[0]] = temp[1];
        });

        pageNav(keyValues.page);
    }

    function initPageNavSystem() {
        if(window.location.hash != '') {
            hashChange();
        } else {
            window.location.hash = 'page=' + qs('.page.active').getAttribute('id') + ';';
        }
    }

    window.onhashchange = hashChange;

    initPageNavSystem();
})();