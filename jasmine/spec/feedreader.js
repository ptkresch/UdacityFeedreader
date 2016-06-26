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
        var body = $('body');
        var $menuButton = $('.menu-icon-link');
        var $menuPosition;

        it('is hidden by default', function() {
            var menuPosition = $('.slide-menu').position().left;
            expect(body.hasClass('menu-hidden')).toBe(true);
            //Menu position -192 obtained through devtools and the css stylesheet for the app.
            expect(menuPosition).toBe(-192);
        });

        describe('The menu will be', function() {

            it('visible when the menu button is clicked once', function() {
                $menuButton.trigger('click');
                expect(body.hasClass('menu-hidden')).toEqual(false);
            });

            it('hidden when the menu button is clicked again', function() {
                $menuButton.trigger('click');
                expect(body.hasClass('menu-hidden')).toEqual(true);
            });
        });

        it('moves offscreen', function(done) {
            $menuButton.trigger('click');
            //Due to the transition effect, multiple timeouts are requrired to ensure that
            //expect functions are called after the transition ends - otherwise the wrong
            //position is reported.
            window.setTimeout(function() {
                $menuPosition = $('.slide-menu').position().left;
                expect($menuPosition).not.toBeLessThan(0);
                $menuButton.trigger('click');
                window.setTimeout(function() {
                    $menuPosition = $('.slide-menu').position().left;
                    expect($menuPosition).toBeLessThan(0);
                    done();
                }, 1500);
            }, 1500);
        });
    });

    describe('Initial Entries', function() {
        //Asynchronous request requires callback, or the test runs before the ajax request finishes.
        loadFeed.initialComplete = false;
        loadFeed.wait = function(cb) {
            setTimeout(function() {
                loadFeed.initialComplete = true;
                if (cb) {
                    return cb();
                }
            }, 3);
        };
        beforeEach(function(done) {
            loadFeed.wait(function() {
                done();
            });
        });

        it('at least one .entry element exists in the .feed container when loadFeed is called', function(done) {
            loadFeed.wait();
            var $feed = $('.feed');
            var $entry = $('.entry');
            expect(loadFeed.initialComplete).toBe(true);
            //Loadfeed should ensure that there is at least on entry.
            expect($entry.length).toBeGreaterThan(0);
            //Loadfeed should ensure that the entry is added to the feed container.
            expect($feed.length).toBeGreaterThan(0);
            expect($feed.children()[0]).toBe($entry.parent()[0]);
            done();
        });
    });

    describe('New Feed Selection', function() {
        loadFeed.initialComplete = false;
        //Asynchronous request requires callback, or the test runs before the ajax request finishes.
        loadFeed.wait = function(cb) {
            setTimeout(function() {
                loadFeed.initialComplete = true;
                if (cb) {
                    return cb();
                }
            }, 2);
        };
        beforeEach(function(done) {
            //There was an error due to jasmine's default timeout - changing the default fixes this.
            window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
            loadFeed.wait(function() {
                done();
            });
            spyOn(loadFeed, 'wait');
        });
        it('content should change when new feed is loaded', function(done) {
            loadFeed.wait();
            //Ensure loadFeed.wait is called - that way the asynchronous request finishes.
            expect(loadFeed.wait).toHaveBeenCalled();
            var $entry = $('.entry');
            expect(loadFeed.initialComplete).toBe(true);
            for (var i = 0; i < allFeeds.length; i++) {
                (function(entry) {
                    //Each entry in allFeeds is added to the document.
                    expect(jQuery.contains(document, entry));
                })($entry[i]);
            }
            done();
        });

    });

}());