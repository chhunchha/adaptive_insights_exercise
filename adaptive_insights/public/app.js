angular.module('app', ['ngPrettyJson','ngMessages']);

angular
    .module('app')
    .controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];

function AppCtrl($scope, $http) {
    var ctrl = this;
    ctrl.data = {};

    // Status
    // 0 - no change
    // -1 - no node found
    // 1 - node found
    // 2 - search in progress
    ctrl.search = {
        status: 0
    };

    ctrl.handleError = function(response) {
        //alert(response.status + " - " + response.statusText + " - " + response.data);
        console.log(response.status + " - " + response.statusText + " - " + response.data);
    }

    // Get json data from server using get request
    ctrl.getData = function() {
        $http.get('/data').then(function(response){
            ctrl.data = response.data;
        }, function(response){
            ctrl.handleError(response);
        });
    }

    // ctrl.getData();

    // Problem 3
    // find node for given id 
    ctrl.findNode = function(frmSearchNode) {

        function traverseObject(obj) {
            if(Object.keys(obj).length != 0) {
                for(var key in obj) {

                    if(obj["id"] == ctrl.search.id) {
                        ctrl.search.status = 1;
                        ctrl.search.label = obj["label"];
                        break;
                    }

                  //  console.log(key);
                  //  console.log(typeof obj[key]);

                    if(typeof obj[key] === "object") {
                        traverseObject(obj[key]);
                    }
                }
            } 
        }

        if(frmSearchNode.searchNodeId.$invalid) {
            frmSearchNode.searchNodeId.$setTouched();
            return;
        }

        // starting search
        ctrl.search.status = 2;
        traverseObject(ctrl.data);

        // node not found
        if(ctrl.search.status != 1 ) {
            ctrl.search.status = -1;
        }

        console.log(ctrl.search);
    }

    // Problem 4

    ctrl.states = ['CA', 'AZ'];
    ctrl.profile = {};

    ctrl.cancel = function(frmProfile) {
        frmProfile.$setPristine();
        frmProfile.$setUntouched();
        ctrl.profile = {};
    }

    ctrl.ok = function(frmProfile) {
        console.log(frmProfile);
        if(frmProfile.$invalid) {
            angular.forEach(frmProfile.$error, function (field) {
                angular.forEach(field, function(errorField){
                    errorField.$setTouched();
                })
            });        
        }
    }
}
