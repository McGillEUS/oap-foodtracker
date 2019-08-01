var app = angular.module('foodTracker', [ 'mp.datePicker' ]);
app.controller('jsonGUIController', function($scope, $timeout) {

    $scope.food = [

        {

            "name" : "Placeholder",

            "supplier" : "Provigo",

            "quantity_per_pack" : 8,

            "packs_per_cooler" : 12,

            "packs_per_box" : 16,

            "price" : 0.00,

            "volunteer_page": 0,

            "history" : [

                {

                    "date" : "2019-08-25T04:00:00.000Z",

                    "type" : "delivery",

                    "stock" : "200"

                },

                {

                    "date" : "2019-08-25T13:00:00.000Z",

                    "type" : "normal",

                    "stock" : "180"

                }

            ]

        }

    ];

    var loadData = function() {
        $.ajax({
            'async': false,
            'global': false,
            'url': "data/OAPhood.json",
            'dataType': "json",
            'success': function (data) {
                $scope.food = data;
                toastr.success("Loaded food history.");
            }
        });
    };
    loadData();

    // save changes to JSON file
    var saveData = function() {
        $.ajax({ 
            'url' : 'app/saveData.php',
            'data' : {'data' : JSON.stringify($scope.food)},
            'type' : 'POST',
            'dataType' : 'json',
            'success' : function() {
            }
        });
        toastr.success("Changes saved.");
    };

    var clearAll = function() {
        $scope.editing = false;
        $scope.staging = [];
        angular.forEach($scope.food, function() {
            $scope.staging.push(0);
        });
        $scope.inputType = "normal";
    };
    clearAll();

    $scope.stage = function(index, quantity, action) {
        if (action == "take") {
            $scope.staging[index] += quantity;
        } else if (action == "replace") {
            $scope.staging[index] -= quantity;
        }
    };

    $scope.commitChanges = function() {
        var today = new Date();
        var counter = 0;
        angular.forEach($scope.staging, function(quantity) {
            if (quantity != 0) {
                if ($scope.inputType == "delivery") {
                    // when we have a delivery, the "take" buttons change to "receive" buttons, so reverse the quantity
                    quantity = -quantity;
                }
                var newEntry = {
                    "date" : today,
                    "type" : $scope.inputType,
                    "stock" : ""
                };
                newEntry.stock = parseInt($scope.food[counter].history[$scope.food[counter].history.length - 1].stock) - quantity;
                $scope.food[counter].history.push(newEntry);
            }
            counter++;
        });
        clearAll();
        saveData();
    };

    $scope.usedSince = function(item, date) {
        var result = 0;
        if (item.history.length < 1) {
            return result;
        } else {
            var entries = [];
            angular.forEach(item.history, function(checkpoint) {
                var checkpointDate = new Date(checkpoint.date);
                if (checkpointDate > date && checkpoint.type == "normal") {
                    // get list of all changes resulting from normal operations
                        // i.e. deliveries are not included
                        entries.push(checkpoint);
                }
            });

            if (entries.length == 0) {
                // no entries past the specified date
                return result;
            } else {
                // return the overall change in the time frame
                return entries[0].stock - entries[entries.length - 1].stock;
            }
        }
    };

    // upload JSON file of history
    $scope.uploadFile = function() {
        var file = document.getElementById("fileLoader").files[0];
        var fileReader = new FileReader();
        
        fileReader.onload = function(e) {
            $scope.food = angular.fromJson(fileReader.result);

            clearAll();
            toastr.success("File imported successfully.");
            $scope.$apply();
        }

        fileReader.readAsText(file, $scope);
    };

    // download JSON file of history
    $scope.exportChanges = function() {
        var data = new Blob([angular.toJson($scope.food, true)], {type: 'text/plain'});
        var downloadLink = document.getElementById('filedownload');
        downloadLink.href = window.URL.createObjectURL(data);
        $timeout(function() {
            downloadLink.click(); // performs click to start download
        }, 100);
    };

    $scope.openFile = function() {
        $("#fileLoader").click();
    };

    /* UTILITY FUNCTIONS */
    $scope.today = function () {
        var now = new Date();
        var month = now.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = now.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return now.getFullYear() + "-" + month + "-" + day;
    }

    $scope.startsOfTime = function (timeline) {
        var start = new Date();
        if (timeline == "week") {
            var day = start.getDay();
            start.setDate(start.getDate() - day + (day == 0 ? -6:1));
            start.setHours(0);
        } else if (timeline == "day") {
            start.setHours(0);
        } else if (timeline == "hour") {
            // no need to do anything
        }

        start.setMinutes(0);
        start.setSeconds(0);
        start.setMilliseconds(0);

        return start;
    };

    /* DATE PICKER FUNCTIONS */
    $scope.formatDate = function (date) {
        function pad(n) {
            return n < 10 ? '0' + n : n;
        }
    
        return date && date.getFullYear()
            + '-' + pad(date.getMonth() + 1)
            + '-' + pad(date.getDate());
    };
    $scope.parseDate = function (s) {
        var tokens = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    
        return tokens && new Date(tokens[1], tokens[2] - 1, tokens[3]);
    };
});
