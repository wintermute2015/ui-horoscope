(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShowTodayCtrl', ShowTodayCtrl);

    ShowTodayCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'ShowService', 'today'];

    function ShowTodayCtrl($rootScope, $state, $stateParams, ShowService, today) {
        var vm = this;
        angular.extend(vm, {
            init: init,
            showYesterday: showYesterday,
            showTomorrow: showTomorrow,
            signsBack: signsBack,
            errorHandler: errorHandler
        });

        angular.extend(vm, $stateParams.item);

        function init() {
            vm.date = ShowService.paramDate('today');
			
			if (today) {
			vm.details = today;
            $rootScope.loading = false;
            $rootScope.myError = false;
			} else {
				errorHandler();
			}
        }

        function showYesterday() {
            $rootScope.loading = true;
            $state.go('show-yesterday', {item: $stateParams.item});
        }

        function showTomorrow() {
            $rootScope.loading = true;
            $state.go('show-tomorrow', {item: $stateParams.item});
        }

        function errorHandler() {
            $rootScope.loading = false;
            $rootScope.myError = true;
        }

        function signsBack() {
            $rootScope.loading = true;
			if ($stateParams.item.friends) {
				$state.go('friends');
			} else {
				$state.go('signs');
			}
        }
    }
})();