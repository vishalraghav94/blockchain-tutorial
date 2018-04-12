const app = angular.module('login', []);
app.controller('loginController', function($scope, $http) {
    $scope.formData = new FormData(document.getElementById('login-form'));
    var urls = ['/login', '/signup'];
    $('.sign-in-tab').addClass('activated-tab');
    $('#login-form, #signup-form').on('submit', function(event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var index = parseInt($(this).attr('index'));
        var url = urls[index];
        data = parseFormData(data);
        validateForm(data);
        const req = {
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $http(req).then(function(success, err) {
            if (success.data.Error) {
                if (success.data.Error === 'No such user exist') {
                    $($('.input-text')[0]).addClass('error-animation');
                    window.setTimeout(function() {
                        $($('.input-text')[0]).removeClass('error-animation');
                    }, 150);
                }
                else if (success.data.Error === 'User already exist') {
                    $('.user-msg').text('User with the same info already Exist');
                }
                else if (success.data.Error === 'Please fill all the fields') {
                    $('.user-msg').text('Please fill all the fields');
                }
                else {
                    $($('.input-text')[1]).addClass('error-animation');
                    window.setTimeout(function() {
                        $($('.input-text')[1]).removeClass('error-animation');
                    }, 150);
                }
            }
            else if (success.data.msg === 'User Created') {
                $('.user-msg').text('user has been created, You can now Sign In')
            }
            else {
                window.location.href = window.location.href + 'welcome';
            }
        });
    });

    $('.sign-in-tab').on('click', function() {
        $(this).addClass('activated-tab');
        $('.sign-up-tab').removeClass('activated-tab');
       $('.login').removeClass('inactive-sign-in');
       $('.signup').removeClass('active-tab');
    });
    $('.sign-up-tab').on('click', function() {
        $(this).addClass('activated-tab');
        $('.sign-in-tab').removeClass('activated-tab');
        $('.signup').addClass('active-tab');
        $('.login').addClass('inactive-sign-in');
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

function validateForm(data) {
    console.log(data);
}
