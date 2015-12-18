(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowYesterdayCtrl', ShowYesterdayCtrl);

    ShowYesterdayCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService', 'yesterday'];

    function ShowYesterdayCtrl($rootScope, $state, $stateParams, ShowService, yesterday) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showToday: showToday,
            showTomorrow: showTomorrow,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        //angular.extend(vm, $stateParams.item);

        function init() {
            vm.date = ShowService.paramDate('yesterday');
			vm.signName = $stateParams.signName;
			
			if (yesterday) {
			vm.details = yesterday;
            $rootScope.loading = false;
            $rootScope.myError = false;
			} else {
				errorHandler();
			}
        }

        function showToday() {
            $rootScope.loading = true;
            $state.go('show-today', {signName: $stateParams.signName});
        }

        function showTomorrow() {
            $rootScope.loading = true;
            $state.go('show-tomorrow', {signName: $stateParams.signName});
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function signsBack() {
            $rootScope.loading = true;
			if ($stateParams.friends) {
				$state.go('friends');
			} else {
				$state.go('signs');
			}
        }
    }
})();