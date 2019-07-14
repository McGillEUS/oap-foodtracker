var app = angular.module('foodTracker', [ 'mp.datePicker' ]);
app.controller('jsonGUIController', function($scope, $timeout) {

    $scope.food = [
        {
            "name" : "Beef Burgers",
            "supplier" : "Provigo",
            "quantity_per_pack" : 8,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "200"
                }
            ]
        },
        {
            "name" : "Chicken Burgers",  
            "supplier" : "Provigo",
            "quantity_per_pack" : 8,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "200"
                }
            ]
        },
        {
            "name" : "Veggie Burgers",
            "supplier" : "Provigo",
            "quantity_per_pack" : 4,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "200"
                }
            ]
        },
        {
            "name" : "Hot Dog",
            "supplier" : "Provigo",
            "quantity_per_pack" : 32,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "200"
                }
            ]
        },
        {
            "name" : "Beyond Meat Burger",
            "supplier" : "McGill",
            "quantity_per_pack" : 8,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "200"
                }
            ]
        },
        {
            "name" : "Cheese",
            "supplier" : "Provigo",
            "quantity_per_pack" : 100,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "25"
                }
            ]
        },
        {
            "name" : "Hot Dog Buns",
            "supplier" : "Provigo",
            "quantity_per_pack" : 24,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "50"
                }
            ]
        },
        {
            "name" : "Burger Buns",
            "supplier" : "Provigo",
            "quantity_per_pack" : 24,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "100"
                }
            ]
        },
        {
            "name" : "Ketchup",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "10"
                }
            ]
        },
        {
            "name" : "Mustard",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "5"
                }
            ]
        },
        {
            "name" : "Mayo",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "inventory",
                    "stock" : "4"
                }
            ]
        },
        {
            "name" : "Relish",
            "supplier" : "Provigo",
            "quantity_per_pack" : 3,
            "price" : 0.00,
            "history" : [
                {
                    "date" : "2019-08-25T04:00:00.000Z",
                    "type" : "normal",
                    "stock" : "3"
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
    };
    clearAll();

    $scope.take = function(item, quantity, action) {
        var newEntry = {
            "date" : "",
            "type" : "normal",
            "stock" : ""
        };
        newEntry.date = new Date();
        
        if (action == "take") {
            newEntry.stock = item.history[item.history.length - 1].stock - quantity;
        } else if (action == "replace") {
            newEntry.stock = item.history[item.history.length - 1].stock + quantity;
        }
        item.stock = newEntry.stock;
        item.history.push(newEntry);
    };

    $scope.usedSince = function(item, date) {
        var result = 0;
        if (item.history.length < 1) {
            return result;
        } else {
            var entries = [];
            angular.forEach(item.history, function(checkpoint) {
                if (checkpoint.date > date && checkpoint.type == "normal") {
                    // get list of all changes resulting from normal operations
                        // i.e. deliveries are not included
                        entries.push(checkpoint);
                }
            });

            if (entries.length == 0) {
                // no entries past the specified date
                return result;
            } else {
                return entries[entries.length - 1] - entries[0];
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

    $scope.startsOfTime = function () {
        var ret = {
            "week" : "",
            "day" : "",
            "hour" : ""
        };
        ret.week = new Date();
        ret.day = new Date();
        ret.hour = new Date();

        var day = ret.week.getDay();
        ret.week.setDate(ret.week.getDate() - day + (day == 0 ? -6:1));
        ret.week.setHours(0);
        ret.week.setMinutes(0);
        ret.week.setSeconds(0);
        ret.week.setMilliseconds(0);

        ret.day.setHours(0);
        ret.day.setMinutes(0);
        ret.day.setSeconds(0);
        ret.day.setMilliseconds(0);

        ret.hour.setMinutes(0);
        ret.hour.setSeconds(0);
        ret.hour.setMilliseconds(0);

        return ret;
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
