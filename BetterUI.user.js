// ==UserScript==
// @name         BetterUI
// @version      2.2
// @match        https://*.ycombinator.com/*
// @match        https://lobste.rs/*
// @description  Remove bs from hackernews, lobster etc
// @homepage     https://github.com/pombadev/userscripts
// ==/UserScript==

function nextSibbling(element) {
    let next;
    let allChildren = Array.from(element.parentNode.parentNode.parentNode.childNodes);

    for (const [index, child] of allChildren.entries()) {
        let current = element.parentNode.parentNode

        if (!current) { continue }

        if (child.id === current.id) {
            next = index + 1;
            break
        }

    }

    return allChildren[next]
}

function removeElements(element) {
    let sibbling = nextSibbling(element);
    element.parentNode.parentNode.remove()
    if (sibbling) {
        sibbling.remove()
    }
}

function appendFavicons(element) {
    const domain = new URL(element.href).hostname
    const imageUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`
    const image = document.createElement('img')
    image.src = imageUrl
    image.width = 12
    image.height = 12
    image.style.paddingRight = '0.25em'
    image.style.paddingLeft = '0.25em'
    element.prepend(image)
}

// mostly bs
const blacklists = [
    /theregister\.com/,
    /twitter\.com/,
    /forbes\.com\/sites\//,
]

for (let link of document.links) {
    switch (location.origin) {
        case "https://news.ycombinator.com":
            // link item
            if (link.matches('.titlelink')) {
                // removes anything that's not external links
                // eg: ask|tell|show or whatever crap
                if (link.href.match(/https:\/\/news\.ycombinator\.com\/item\?id=\d+/)) {
                    removeElements(link)
                }

                if (blacklists.some(blacklist => link.href.match(blacklist))) {
                    removeElements(link)
                }
            }

            break;

        case "https://lobste.rs":
            // remove setting dark/light by website
            document.querySelector('html').classList.remove('color-scheme-system')

            if (blacklists.some(blacklist => link.href.match(blacklist))) {
                removeElements(link)
            }

            if (link.matches('.u-url')) {
                appendFavicons(link)
            }
            break;
    }
}
