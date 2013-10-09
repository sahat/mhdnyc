define(function(require) {
  var Backbone = require("backbone");
  var Router = require("router");

  var Track = require('../../app/js/collections/playlist')

  var playlistData = [{
      "title":  "Album A",
      "artist": "Artist A",
      "tracks": [
          {
              "title": "Track A",
              "url": "/music/Album A Track A.mp3"
          },
          {
              "title": "Track B",
              "url": "/music/Album A Track B.mp3"
          }]
  }, {
      "title": "Album B",
      "artist": "Artist B",
      "tracks": [
          {
              "title": "Track A",
              "url": "/music/Album B Track A.mp3"
          },
          {
              "title": "Track B",
              "url": "/music/Album B Track B.mp3"
      }]
  }];

  describe("Application Router", function() {
    it("exists", function() {
      expect(Router).toBeTruthy();
    });

    it("is a Backbone.Router", function() {
      expect(Router.prototype instanceof Backbone.Router).toBe(true);
    });
  });


  describe("Playlist", function() {

    beforeEach(function() {
      this.playlist = new Playlist(playlistData);
    });

    it("creates from data", function() {
      expect(this.playlist.get('tracks').length).toEqual(2);
    });

    describe('first track', function() {
      it('identifies correct first track', function() {
        expect(this.playlist.isFirstTrack(0)).toBeTruthy();
      });
    });

    describe('last track', function() {
      it('identifies correct last track', function() {
        expect(this.playlist.isLastTrack(1)).toBeTruthy();
      });
    });

    it('returns the URL for a track', function() {
      expect(this.playlist.trackUrlAtIndex(0)).toEqual('/music/Album A Track A.mp3');
    });


  });




  describe("one tautology", function() {
    it("is a tautology", function() {
      expect(true).toBeTruthy();
    });

    describe("is awesome", function() {
      it("is awesome", function() {
        expect(1).toBe(1);
      });
    });
  });

  describe("simple tests", function() {
    it("increments", function() {
      var mike = 0;

      expect(mike++ === 0).toBeTruthy();
      expect(mike === 1).toBeTruthy();
    });

    it("increments (improved)", function() {
      var mike = 0;

      expect(mike++).toBe(0);
      expect(mike).toBe(1);
    });
  });

  describe("setUp/tearDown", function() {
    beforeEach(function() {
      // console.log("Before");
    });

    afterEach(function() {
      // console.log("After");
    });

    it("example", function() {
      // console.log("During");
    });

    describe("setUp/tearDown", function() {
      beforeEach(function() {
        // console.log("Before2");
      });

      afterEach(function() {
        // console.log("After2");
      });

      it("example", function() {
        // console.log("During Nested");
      });
    });
  });

  describe("async", function() {
    it("multiple async", function() {
      var semaphore = 2;

      setTimeout(function() {
        expect(true).toBeTruthy();
        semaphore--;
      }, 500);

      setTimeout(function() {
        expect(true).toBeTruthy();
        semaphore--;
      }, 500);

      waitsFor(function() { return semaphore === 0 });
    });
  });
});
