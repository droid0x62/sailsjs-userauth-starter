angular.module('DashMod',[])
.controller('DashCtrl',['$scope','$http',function($scope,$http){
    
    $scope.getUser = function(){
        console.log("getting user info");
        
        $http.get('/getUser')
        .then(function onSuccess(user){
            $scope.user = user.data;
        })
        .catch(function onError(err){
            return res.negotiate(err);
        })
        
    }
    
}])