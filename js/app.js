/*  -------------------------------------------------------------
    Navigate to Nasqueron
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Author:         Dereckson
    Tags:           Keyboard navigation
    Dependencies:   Mousetrap, dojo
    Filename:       app.js
    Version:        1.0
    Created:        2014-01-10
    Modified:       2014-01-11
    Licence:        BSD
    -------------------------------------------------------------    */

/*  -------------------------------------------------------------
    Table of contents
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    :: Keyboard events
    :: Keyboard shortcuts help

 */

/*  -------------------------------------------------------------
    Keyboard events
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

require(["dojo/request/xhr"], function (xhr) {
    xhr("https://api.nasqueron.org/sites.json",
        {
            handleAs: "json"
        }
    ).then(
        function (sites) {
            for (var i = 0 ; i < sites.length ; i++) {
                //Press g, <site.shortcutKey> to directly go to this site.
                (function(site) {
                    Mousetrap.bind('g ' + site.shortcutKey, function() {
                        var url = "//" + site.id + ".nasqueron.org";
                        document.location.href = url;
                    });
                })(sites[i]);
            }
        },
        function (err) {
            console.log("Error fetching Nasqueron sites map: ", err);
        }
    );
});

/*  -------------------------------------------------------------
    Keyboard shortcuts help

    Based on QuestionMark.js by Louis Lazaris
    http://impressivewebs.github.io/QuestionMark.js/
    CC-BY 2.0 license with additional waiver 'no credit required'

    Port to Dojo 1.9 by Dereckson
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

require([
    "dojo/request",
    "dojo/on",
    "dojo/window",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/query"
], function (request, on, win, dom, domConstruct, domClass, query) {
    /**
     * Timeout to resize the help window
     */
    var resizeHelpWindowTimeout = null;

    /**
     * Initializes keyboard shortcuts help
     *
     * @param string content The HTML content of the help window
     */
    function initializeKeyboardShortcuts (content) {
        //Places keyboard shortcuts element in DOM
        domConstruct.place(content, dojo.body(), "last");
        resizeHelpWindow();

        //
        // Events
        //

        //? to open or close the help window
        Mousetrap.bind("?", toggleHelp);

        //Closes on the close box and the dimmed part of the screen, but not in the modal
        on(dom.byId("helpUnderlay"), "click", closeHelp);
        on(dom.byId("helpModal"), "click", function (e) {
            e.stopPropagation();
        });
        on(dom.byId("helpClose"), "click", closeHelp);

        //On window resize (if there is more than one column)
        if (query(".help-list").length > 1) {
            on(window, "resize", function (e) {
                if (resizeHelpWindowTimeout != null) {
                    clearTimeout(resizeHelpWindowTimeout);
                }
                resizeHelpWindowTimeoutt = setTimeout(resizeHelpWindow, 100);
            });
        }
    }

    /**
    * Resizes the help window
     */
    function resizeHelpWindow () {
        //Matches the window dim effect layer to the window height.
        dom.byId("helpUnderlay").style.height = win.getBox().h + "px";

        //Finds out how many columns there are, creates array of heights
        var helpLists = query(".help-list");
        var helpColsCount = helpLists.length, maxHeight = 0;
        for (var i = 0 ; i < helpLists.length ; i++) {
            if (helpLists[i].offsetHeight > maxHeight) {
                maxHeight = helpLists[i].offsetHeight;
            }
        }

        //Quasi-responsive
        var windowWidth = win.getBox().w;
        if (helpColsCount > 2 && windowWidth <= 1180 && windowWidth > 630) {
            helpColsCount = 2;
            maxHeight *= maxHeight;
        }
        if (windowWidth <= 630) {
            maxHeight *= helpColsCount;
            helpColsCount = 1;
        }

        //Changes the width/height of the modal and wrapper to fit the columns
        //Sorry for the magic numbers. Whatevs.
        var helpListWrap = dom.byId("helpListWrap"),
            helpModal = dom.byId("helpModal");
        helpListWrap.style.offsetWidth = (helpLists[0].offsetWidth * helpColsCount) + "px";
        helpListWrap.style.height = maxHeight + "px";
        helpModal.style.width = (helpLists[0].offsetWidth * helpColsCount) + 60 + "px";
        helpModal.style.height = maxHeight + 100 + "px";
    }

    /**
     * Opens help window
     */
    function openHelp () {
        domClass.add("helpUnderlay", "help-isVisible");

        Mousetrap.bind("esc", closeHelp);
    }

    /**
     * Closes help window
     */
    function closeHelp () {
        domClass.remove("helpUnderlay", "help-isVisible");

        Mousetrap.unbind("esc");
    }

    /**
     * Toggles help window close state
     */
    function toggleHelp () {
        if (domClass.contains("helpUnderlay", "help-isVisible")) {
            closeHelp();
        } else {
            openHelp();
        }
    }

    //Reads help file and initializes help
    request("question.mark.html").then(
        initializeKeyboardShortcuts,
        function (err) {
            console.log("Error fetching Keyboard shortcuts help: ", err);
        }
    );
});
