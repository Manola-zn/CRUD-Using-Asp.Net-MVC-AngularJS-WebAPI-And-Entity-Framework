var app = angular.module("myApp", ["datatables"]);

app.controller("StudentController", function ($scope, $http, $window) {
    $scope.InsertData = function () {
        var action = document.getElementById("btnSave").getAttribute("value");
        if (action == "Submit") {
            debugger;
            $scope.Student = {};
            $scope.Student.firstName = $scope.firstName;
            $scope.Student.lastName = $scope.lastName;
            $scope.Student.dateOfbirth = $scope.dateOfbirth;
            $scope.Student.standardID = $scope.Standard;

            $http({
                method: "post",
                url: "http://localhost:58124/Student/Insert_Student",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.dateOfbirth = "";
                $scope.Standard = "";

            })
        } else {
            debugger;
            $scope.Student = {};
            $scope.Student.firstName = $scope.firstName;
            $scope.Student.lastName = $scope.lastName;
            $scope.Student.dateOfbirth = $scope.dateOfbirth;
            $scope.Student.standardID = $scope.Standard;
            $scope.Student.studentID = document.getElementById("studentID_").value;
            console.log($scope.Student.studentID)
            $http({
                method: "post",
                url: "http://localhost:58124/Student/Update_Student",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.firstName = "";
                $scope.lastName = "";
                $scope.dateOfbirth = "";
                $scope.Standard = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Student";
            }, function () {
                alert("Error in updating student record.");
            })
        }
    }

    //This is for fetching data from database.
    $scope.GetAllData = function () {
        debugger;
        $http({
            method: "get",
            url: "http://localhost:58124/Student/Get_AllStudent"
        }).then(function (response) {
            $scope.Students = response.data;
        }, function () {
            alert('Error in getting student records.');
        })
    };

    //This is for deleting the record.
    $scope.DeleteStud = function (Student) {
        $http({
            method: "post",
            url: "http://localhost:58124/Student/Delete_Student",
            datatype: "json",
            data: JSON.stringify(Student)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        }, function () {
            alert("Error in deleting student record.");
        })
    };

    //This is for selecting record on clicking particular record.
    $scope.UpdateStud = function (Student) {
        debugger;

        document.getElementById("studentID_").value = Student.studentID;
        $scope.firstName = Student.firstName;
        $scope.lastName = Student.lastName;
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
            alert('Error in getting standard records.');
        })
    };
    $scope.GetStandardList();


}); 
