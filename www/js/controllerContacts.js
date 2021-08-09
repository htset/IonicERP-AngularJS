angular.module('ionicerp.controllerContacts', ['ionicerp.services'])

.controller('ContactsMenuCtrl', function($scope, $rootScope, $ionicModal, $state) {

	$scope.countries.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.active.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.selectedCountries = [];
	$scope.selectedActive = [];

	$scope.clicked = function (type, member) {

		if(type=="countries"){
		    var index = $scope.selectedCountries.indexOf(member);
		    if(index > -1) {
		        $scope.selectedCountries.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedCountries.push(member);
		        member.selected = true;
		    }			
		}
		else if(type=="active"){
		    var index = $scope.selectedActive.indexOf(member);
		    if(index > -1) {
		        $scope.selectedActive.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedActive.push(member);
		        member.selected = true;
		    }			
		}
	}
	
	$scope.openModal = function(whatToShow){
		
		switch(whatToShow){
			case 'countries':
				$scope.modalHeader = "Choose Country";
				$scope.modalLabel = "Countries";
				$scope.modalType = "countries";
				$scope.listContents = $scope.countries;
				$scope.modal.show();
				break;
			case 'active':
				$scope.modalHeader = "Choose Active/Inactive";
				$scope.modalLabel = "Active";
				$scope.modalType = "active";
				$scope.listContents = $scope.active;
				$scope.modal.show();
				break;
		}
	}

	$scope.sendQuery = function(){

		var countryIds = '';
		var activeIds = '';

		angular.forEach($scope.selectedCountries, function(value, key){
			console.log(key + "--" + value.name);
			countryIds += value.id + '-';
		});

		angular.forEach($scope.selectedActive, function(value, key){
			console.log(key + "--" + value.name);
			activeIds += value.id + '-';
		});

		if(countryIds.length == 0)
			countryIds = '0';
		else
			countryIds = countryIds.substring(0, countryIds.length - 1);

		if(activeIds.length == 0)
			activeIds = '0';
		else
			activeIds = activeIds.substring(0, activeIds.length - 1);

		$rootScope.countryIds = countryIds;
		$rootScope.activeIds = activeIds;
		$state.go('tab.contacts');
	}

	$scope.clearAll = function(){

		$scope.selectedCountries = [];
		$scope.selectedActive = [];

		$rootScope.countryIds = '';
		$rootScope.activeIds = '';
	}
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {scope: $scope}).then(function(modal) {
		$scope.modal = modal;
	});
	
})

.controller('ContactsCtrl', function($scope, $rootScope, Contacts, $ionicLoading) {

	$scope.page= 1;
	$scope.contacts = [];
	$scope.moreContacts = true;

	$scope.remove = function(contact) {
		Contacts.remove(contact);
	};

	$scope.loadMore = function() {

		Contacts.query($rootScope.countryIds, $rootScope.activeIds, $scope.page).then(function(contacts){

			if(contacts.data.length > 0){
				contacts.data.forEach(function(item){
					$scope.contacts.push(item);
				});
			
				$scope.page++;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			else{
				$scope.moreContacts = false;
			}
		}).catch(function(){
			alert('Failed to load data. Please try again');
		});
	};	

})

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts, $ionicLoading) {

    $ionicLoading.show({
      template: 'Loading...'
    });

	Contacts.get($stateParams.contactId).then(function(contact){
		$scope.contact = contact.data;
		$ionicLoading.hide();
	}).catch(function(){
		$ionicLoading.hide();
		alert('Failed to load data. Please try again');
	});
	
});
