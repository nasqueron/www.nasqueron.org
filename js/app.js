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
 */

/*  -------------------------------------------------------------
    Keyboard events
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

require(["dojo/request/xhr"], function (xhr) {
    xhr("sites.json",
        {
            handleAs: "json"
        }
    ).then(
        function (sites) {
            for (var i = 0 ; i < sites.length ; i++) {
                //Press g, <site.shorcutKey> to directly go to this site.
                (function(site) {
                    Mousetrap.bind('g ' + site.shorcutKey, function() {
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
