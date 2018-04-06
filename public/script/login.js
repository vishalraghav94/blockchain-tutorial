const app = angular.module('login', []);
app.controller('loginController', function($scope, $http) {
    $scope.formData = new FormData(document.getElementById('login-form'));

    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        console.log('Hello how are you');
        var data = $(this).serializeArray();
        data = parseFormData(data);
        const req = {
            method: 'POST',
            url: '/login',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $http(req).then(function(success, err) {
            if (success.data.Error) {
                if (success.data.Error === 'No such user exist') {
                    $($('.input-text')[0]).css('border', '1px solid red');
                }
                else {
                    $($('.input-text')[1]).css('border', '1px solid red');
                }
            }
            else {
                window.location.href = window.location.href + 'welcome';
            }
        });
    });
    function parseFormData(data) {
        let i;
        var obj= {};
        for (i = 0; i < data.length; i++) {
            obj[data[i].name] = data[i].value;
        }
        return obj;
    }
});
