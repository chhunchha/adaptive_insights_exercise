angular.module('app', ['ngPrettyJson','ngMessages']);

angular
    .module('app')
    .controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];

function AppCtrl($scope, $http) {
    var ctrl = this;
    ctrl.data = {};

    ctrl.handleError = function(response) {
        //alert(response.status + " - " + response.statusText + " - " + response.data);
        console.log(response.status + " - " + response.statusText + " - " + response.data);
    }

    //// Problem 2 /////

    // Get json data from server using get request
    ctrl.getData = function() {
        $http.get('/data').then(function(response){
            ctrl.data = response.data;
        }, function(response){
            ctrl.handleError(response);
        });
    }

    // ctrl.getData();

    //// Problem 3 /////

    // Status for find process
    // 0 - no change
    // -1 - no node found
    // 1 - node found
    // 2 - search in progress
    ctrl.search = {
        status: 0
    };

    // find node for given id 
    ctrl.findNode = function(frmSearchNode) {

        // Recursive function to traverse nodes
        // if id matches the search id then get label and end the search
        // check all keys - values and if value is object call recursive function on node
        function traverseObject(obj) {
            if(Object.keys(obj).length != 0) {
                for(var key in obj) {
                    // console.log(obj["id"]);
                    if(obj["id"] == ctrl.search.id) {
                        ctrl.search.status = 1;
                        ctrl.search.label = obj["label"];
                        return true;
                    }

                    if(typeof obj[key] === "object") {
                        var found = traverseObject(obj[key]);
                        if(found) {
                            return;
                        }
                    }
                }
            } 
        }

        // check for search node id
        if(frmSearchNode.searchNodeId.$invalid) {
            frmSearchNode.searchNodeId.$setTouched();
            return;
        }

        // starting search
        ctrl.search.status = 2;

        //Starting with all data
        traverseObject(ctrl.data);

        // node not found
        if(ctrl.search.status != 1 ) {
            ctrl.search.status = -1;
        }
    }

    //// Problem 4 /////

    ctrl.states = ['CA', 'AZ'];
    ctrl.profile = {};

    // clear data model and reset the form
    ctrl.cancel = function(frmProfile) {
        frmProfile.$setPristine();
        frmProfile.$setUntouched();
        ctrl.profile = {};
    }

    ctrl.ok = function(frmProfile) {
        // console.log(frmProfile);

        // if form is invalid then mark all fields as touched so it can display error message if they are untouched.
        if(frmProfile.$invalid) {
            angular.forEach(frmProfile.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });        
        }
    }
}
