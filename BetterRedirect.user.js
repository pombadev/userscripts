// ==UserScript==
// @name         BetterRedirect
// @version      0.1.2
// @description  Redirect to alternative frontends
// @author       pombadev
// @match        https://*.tiktok.com/*
// @match        https://twitter.com/*
// @match        https://*.twitter.com/*
// @match        https://*.reddit.com/*
// @grant        window.onurlchange
// @run-at       document-start
// @homepage     https://github.com/pombadev/userscripts
// ==/UserScript==

(function () {
    'use strict';

    // More websites here:
    // https://github.com/libredirect/libredirect

    const Redirector = {
        redirect(url) {
            location.href = location.href.replace(location.origin, url)
        },

        tiktok(url) {
            // if not homepage, redirect.
            if (url !== "https://www.tiktok.com/") {
                this.redirect('https://proxitok.pabloferreiro.es')
            }
        },

        twitter(url) {
            this.redirect('https://nitter.net')
        },

        reddit(url) {
            // https://github.com/spikecodes/libreddit#instances
            // https://codeberg.org/teddit/teddit#instances
            // https://github.com/burhan-syed/troddit
            this.redirect('https://teddit.net')
        },

        start(url = location.href) {
            switch (location.origin) {
                case "https://www.tiktok.com":
                    this.tiktok(url)
                    break
                case "https://twitter.com":
                case "https://mobile.twitter.com":
                    this.twitter(url)
                    break
                case "https://www.reddit.com":
                    this.reddit(url)
                    break
                default:
                // do nothing
            }
        }
    }


    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            Redirector.start(info.url)
        });
    }

    Redirector.start();
})();
