var app = angular.module('foodTracker', [ 'mp.datePicker' ]);
app.controller('jsonGUIController', function($scope, $timeout) {

    $scope.food = [
        {
            "name" : "Beef Burgers",
            "supplier" : "Provigo",
            "quantity_per_pack" : 8,
            "packs_per_cooler" : 12,
            "price" : 0.00,
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
        },
        {
            "name" : "Chicken Burgers",  
            "supplier" : "Provigo",
            "quantity_per_pack" : 8,
            "packs_per_cooler" : 12,
            "price" : 0.00,
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
        },
        {
            "name" : "Veggie Burgers",
            "supplier" : "Provigo",
            "quantity_per_pack" : 4,
            "packs_per_cooler" : 16,
            "price" : 0.00,
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
        },
        {
            "name" : "Hot Dog",
            "supplier" : "Provigo",
            "quantity_per_pack" : 39,
            "packs_per_cooler" : 12,
            "price" : 0.00,
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
        },
        {
            "name" : "Beyond Meat Burger",
            "supplier" : "McGill",
            "quantity_per_pack" : 8,
            "packs_per_cooler" : 12,
            "price" : 0.00,
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
        },
        {
            "name" : "Cheese",
            "supplier" : "Provigo",
            "quantity_per_pack" : 100,
            "packs_per_cooler" : 10,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "25"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "23"
                }
            ]
        },
        {
            "name" : "Hot Dog Buns",
            "supplier" : "Provigo",
            "quantity_per_pack" : 24,
            "packs_per_cooler" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "50"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "48"
                }
            ]
        },
        {
            "name" : "Burger Buns",
            "supplier" : "Provigo",
            "quantity_per_pack" : 24,
            "packs_per_cooler" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "100"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "90"
                }
            ]
        },
        {
            "name" : "Ketchup",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "packs_per_cooler" : 1,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "10"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "9"
                }
            ]
        },
        {
            "name" : "Mustard",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "packs_per_cooler" : 1,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "5"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "4"
                }
            ]
        },
        {
            "name" : "Mayo",
            "supplier" : "Provigo",
            "quantity_per_pack" : 1,
            "packs_per_cooler" : 1,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "4"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "3"
                }
            ]
        },
        {
            "name" : "Relish",
            "supplier" : "Provigo",
            "quantity_per_pack" : 1,
            "packs_per_cooler" : 1,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "delivery",
                    "stock" : "3"
                },
                {
                    "date" : "2019-08-25T13:00:00.000Z",
                    "type" : "normal",
                    "stock" : "2"
                }
            ]
        }
    ];

    var loadData = function() {
        $.ajax({
            'async': false,
            'global': false,
            'url': "data/food.json",
            'dataType': "json",
            'success': function (data) {
                $scope.food = data;
            }
        });
    };
    loadData();

    var clearAll = function() {
        $scope.editing = false;
        $scope.staging = [];
        angular.forEach($scope.food, function() {
            $scope.staging.push(0);
        });
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
                var newEntry = {
                    "date" : today,
                    "type" : "normal",
                    "stock" : ""
                };
                newEntry.stock = parseInt($scope.food[counter].history[$scope.food[counter].history.length - 1].stock) - quantity;
                $scope.food[counter].history.push(newEntry);
            }
            counter++;
        });
        clearAll();
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

    // save changes to JSON file
    $scope.saveChanges = function() {

        $.ajax({ 
            'url' : 'app/saveChanges.php',
            'data' : {'data' : JSON.stringify($scope.food)},
            'type' : 'POST',
            'dataType' : 'json',
            'success' : function() {
            }
        });
        toastr.success("Chagnes saved.");
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
