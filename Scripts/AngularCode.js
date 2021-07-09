var app = angular.module("myApp", ["datatables"]);

app.controller("StudentController", function ($scope, $http, $window) {
    //This is for insert a new data record.
    $scope.InsertData = function () {
        var action = document.getElementById("btnSave").getAttribute("value");
        if (action == "Submit") {
            debugger;
            $scope.Student = {};
            $scope.Student.firstName = $scope.firstName;
            $scope.Student.lastName = $scope.lastName;
            $scope.Student.gender = $scope.gender;
            $scope.Student.dateOfbirth = $scope.dateOfbirth;
            $scope.Student.standardID = $scope.Standard;

            $http({
                method: "post",
                url: "http://localhost:58124/Student/Insert_Student",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                if (response) {
                    swal({
                        title: $scope.firstName + " " + $scope.lastName + " " + "Details",
                        text: "Added Successfully",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                }
                $scope.GetAllData();
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.gender = "";
                $scope.dateOfbirth = "";
                $scope.Standard = "";
            });
        } else {
            debugger;
            $scope.Student = {};
            $scope.Student.firstName = $scope.firstName;
            $scope.Student.lastName = $scope.lastName;
            $scope.Student.gender = $scope.gender;
            $scope.Student.dateOfbirth = $scope.dateOfbirth;
            $scope.Student.standardID = $scope.Standard;
            $scope.Student.studentID = document.getElementById("studentID_").value;
            console.log($scope.Student.studentID);
            $http({
                method: "post",
                url: "http://localhost:58124/Student/Update_Student",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                if (response) {
                    swal({
                        title: $scope.firstName + " " + $scope.lastName + " " + "Details",
                        text: "Updated Successfully",
                        type: "success",
                        confirmButtonText: "Ok"
                    });
                }
                $scope.GetAllData();
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.gender = "";
                $scope.dateOfbirth = "";
                $scope.Standard = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Student";
            }, function () {
                swal({
                        title: "Error!",
                        text: "Error in updating" + " " + $scope.firstName +" "+ "record.",
                        type: "warning",
                        confirmButtonText: "Ok"
                    });
            });
        }
    };

    //This is for fetching data from database.
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "http://localhost:58124/Student/Get_AllStudent"
        }).then(function (response) {
            $scope.Students = response.data;
        }, function () {
            swal({
                    title: "Error!",
                    text: "Error in getting student records.",
                    type: "warning",
                    confirmButtonText: "Ok"
                });
        });
    };

    //This is for deleting the record.
    $scope.DeleteStud = function (Student) {
        $http({
            method: "post",
            url: "http://localhost:58124/Student/Delete_Student",
            datatype: "json",
            data: JSON.stringify(Student)
        }).then(function (response) {
            $scope.firstName = Student.firstName;
            $scope.lastName = Student.lastName;

            if (response) {
                swal({
                    title: $scope.firstName + " " + $scope.lastName + " " + "Details",
                    text: "Deleted Successfully",
                    type: "success",
                    confirmButtonText: "Ok"
                });
            }
            $scope.GetAllData();
        }, function () {
                swal({
                    title: "Error!",
                    text: "Error in deleting" + " " + $scope.firstName +" "+ "record.",
                    type: "warning",
                    confirmButtonText: "Ok"
                });
        });
    };

    //This is for selecting record on clicking particular record.
    $scope.UpdateStud = function (Student) {
        debugger;
        document.getElementById("studentID_").value = Student.studentID;
        $scope.firstName = Student.firstName;
        $scope.lastName = Student.lastName;
        $scope.gender = Student.gender;
        $scope.dateOfbirth = Student.dateOfbirth;
        $scope.Standard = Student.standardID;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Yellow";
        document.getElementById("spn").innerHTML = "Update Student Information";
    };

    //This is for fetching data from database to get the list of standards
    $scope.GetStandardList = function () {
        $http({
            method: "get",
            url: "http://localhost:58124/Student/GetStandardList",
            datatype: "json"
        }).then(function (response) {
            debugger;
            $scope.Standards = response.data;
        }, function () {
                swal({
                        title: "Error!",
                        text: "Error in getting standard records.",
                        type: "warning",
                        confirmButtonText: "Ok"
                });
        });
    };
    $scope.GetStandardList();

    //This is use for datepicker.
    $scope.moment = moment;
    //$scope.dateOfbirth = new Date();
    $scope.addFifteen = function () {
        $scope.date = new Date($scope.date.getTime() + (15 * 60000));
    };


}) 

//This is use for datepicker.
.directive('myDatePicker', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelController) {

            // Private variables
            var datepickerFormat = 'yyyy/mm/dd',
                momentFormat = 'YYYY/MM/DD',
                datepicker,
                elPicker;

            // Init date picker and get objects http://bootstrap-datepicker.readthedocs.org/en/release/index.html
            datepicker = element.datepicker({
                autoclose: true,
                keyboardNavigation: false,
                todayHighlight: true,
                format: datepickerFormat
            });
            elPicker = datepicker.data('datepicker').picker;

            // Adjust offset on show
            datepicker.on('show', function (evt) {
                elPicker.css('left', parseInt(elPicker.css('left')) + +attrs.offsetX);
                elPicker.css('top', parseInt(elPicker.css('top')) + +attrs.offsetY);
            });

            // Only watch and format if ng-model is present https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
            if (ngModelController) {
                // So we can maintain time
                var lastModelValueMoment;

                ngModelController.$formatters.push(function (modelValue) {
                    //
                    // Date -> String
                    //

                    // Get view value (String) from model value (Date)
                    var viewValue,
                        m = moment(modelValue);
                    if (modelValue && m.isValid()) {
                        // Valid date obj in model
                        lastModelValueMoment = m.clone(); // Save date (so we can restore time later)
                        viewValue = m.format(momentFormat);
                    } else {
                        // Invalid date obj in model
                        lastModelValueMoment = undefined;
                        viewValue = undefined;
                    }

                    // Update picker
                    element.datepicker('update', viewValue);

                    // Update view
                    return viewValue;
                });

                ngModelController.$parsers.push(function (viewValue) {
                    //
                    // String -> Date
                    //

                    // Get model value (Date) from view value (String)
                    var modelValue,
                        m = moment(viewValue, momentFormat, true);
                    if (viewValue && m.isValid()) {
                        // Valid date string in view
                        if (lastModelValueMoment) { // Restore time
                            m.hour(lastModelValueMoment.hour());
                            m.minute(lastModelValueMoment.minute());
                            m.second(lastModelValueMoment.second());
                            m.millisecond(lastModelValueMoment.millisecond());
                        }
                        modelValue = m.toDate();
                    } else {
                        // Invalid date string in view
                        modelValue = undefined;
                    }

                    // Update model
                    return modelValue;
                });

                datepicker.on('changeDate', function (evt) {
                    // Only update if it's NOT an <input> (if it's an <input> the datepicker plugin trys to cast the val to a Date)
                    if (evt.target.tagName !== 'INPUT') {
                        ngModelController.$setViewValue(moment(evt.date).format(momentFormat)); // $seViewValue basically calls the $parser above so we need to pass a string date value in
                        ngModelController.$render();
                    }
                });
            }

        }
    };
});
