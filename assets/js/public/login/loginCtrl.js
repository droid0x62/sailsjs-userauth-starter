angular.module('LoginMod',['toastr'])
.controller('LoginCtrl',['$scope','$http','toastr',function($scope,$http,toastr){
    console.log("LoginController  is intiatiated");
        
    $scope.runLogin = function(){
        console.log("Login is initiated");
        
        $http.put('/login',{
            email : $scope.email,
            password : $scope.password
        }).then(function onSuccess(){
            toastr.success('Login successful', 'Validated!');
            window.location = '/dashboard' 
        }).catch(function onError(err){
            if(err.status ==404 | 400){
                toastr.error('Invalid Credentials','Error');
                return ;
            }
            toastr.error("Invalid Credentials",'Error');
                return ;
        })
        
    }//scope.runlogin
    
    
}])