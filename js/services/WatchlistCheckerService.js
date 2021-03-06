angular.module('DuckieTV.providers.watchlistchecker', [])

/** 
 * The watchlist checker service will monitor the user's watchlist 
 * (to be built) to see if a proper release of a movie came out.
 * This will require some fiddling with a scene releases database to check for
 * a minimum quality.
 *
 * This is useful for being reminded when proper releases of movies finally
 * come out.
 */
.factory('WatchListCheckerService', function($rootScope) {



    var service = {
        initialize: function() {
            $rootScope.$on('watchlist:check', function(episode) {
                // fetch services that check for aired episode releases
                // fetch config for quality
                // resolve provider to check for download
                // cancel alarm when needed

            });
        }

    }
    //service.initialize()
    return service;

})