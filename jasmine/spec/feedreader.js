/* feedreader.js*/
$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have defined, non-empty urls', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                (function(feed) {
                    var url = feed.url;
                    expect(url).toBeDefined();
                    expect(typeof(url)).toEqual("string");
                    expect(url.length).toBeGreaterThan(0);
                })(allFeeds[i]);
            }
        });

        it('have defined, non-empty names', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                (function(feed) {
                    var name = feed.name;
                    expect(name).toBeDefined();
                    expect(typeof(name)).toEqual("string");
                    expect(name.length).toBeGreaterThan(0);
                })(allFeeds[i]);
            }
        });
    });

    describe('The menu', function() {
        var body = $('body'),
            $menuButton = $('.menu-icon-link'),
            $menuPosition;

        it('is hidden by default', function() {
            var menuPosition = $('.slide-menu').position().left;
            expect(body.hasClass('menu-hidden')).toBe(true);
            //Menu position -192 obtained through devtools and the css stylesheet for the app.
            expect(menuPosition).toBe(-192);
        });

        describe('The menu will be', function() {

            it('visible when the menu button is clicked once', function() {
                $menuButton.click();
                expect(body.hasClass('menu-hidden')).toEqual(false);
            });

            it('hidden when the menu button is clicked again', function() {
                $menuButton.click();
                expect(body.hasClass('menu-hidden')).toEqual(true);
            });
        });

        it('moves offscreen', function(done) {
            $menuButton.click();
            //Due to the transition effect, multiple timeouts are requrired to ensure that
            //expect functions are called after the transition ends - otherwise the wrong
            //position is reported.
            window.setTimeout(function() {
                $menuPosition = $('.slide-menu').position().left;
                expect($menuPosition).not.toBeLessThan(0);
                $menuButton.click();
                window.setTimeout(function() {
                    $menuPosition = $('.slide-menu').position().left;
                    expect($menuPosition).toBeLessThan(0);
                    done();
                }, 1500);
            }, 1500);
        });
    });

    describe('Initial Entries', function() {
        //This entry has the amount of feeds before loadFeed runs,
        //so it should have a length of 0.
        var $entry = $('.entry');
        it('at least one .entry element exists in the .feed container when loadFeed is called', function(done) {
            //There shouldn't be anything in the entry container yet.
            expect($entry.length).toBe(0);
            loadFeed(1, function() {
                //Load feed has been called, get the updated entry container.
                $entry = $('.entry');
                //After loadFeed is called, we expect the entry container to 
                //have more than 1 entry.
                expect($entry.length).toBeGreaterThan(0);
                done();
            });
        });
    });

    describe('New Feed Selection', function() {
        var $entry, $oldentry;
        it('content should change when new feed is loaded', function(done) {
            //Load a feed
            loadFeed(2, function() {
                //Get a reference to this entry container, so we can see if the DOM updates
                //when loadFeed is called again.
                $oldentry = $('.entry');
                //Call loadFeed again in the callback from the first loadFeed call. This way,
                //it won't run until the first is finished.
                loadFeed(3, function() {
                    //Load feed has been called twice now - get the updated entry container.
                    $entry = $('.entry');
                    //After loadFeed is called a second time, we expect the entry container to 
                    //have more than 1 entry.
                    expect($entry[0].innerHTML).not.toBe($oldentry[0].innerHTML);
                    done();
                });
            });
        });

    });

}());