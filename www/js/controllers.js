angular.module('ionicerp.controllers', ['ionicerp.services'])

.controller('DashCtrl', function($scope) {})

.controller('MenuCtrl', function($scope) {})

.controller('CompaniesMenuCtrl', function($scope, $rootScope, $ionicModal, $state) {

	$scope.companyTypes.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.countries.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.active.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.selectedCompanyTypes = [];
	$scope.selectedCountries = [];
	$scope.selectedActive = [];

	$scope.clicked = function (type, member) {

		if(type=="companyTypes"){
		    var index = $scope.selectedCompanyTypes.indexOf(member);
		    if(index > -1) {
		        $scope.selectedCompanyTypes.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedCompanyTypes.push(member);
		        member.selected = true;
		    }
		}
		else if(type=="countries"){
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
			case 'companyTypes':
				$scope.modalHeader = "Choose Company Type";
				$scope.modalLabel = "Company Types";
				$scope.modalType = "companyTypes";
				$scope.listContents = $scope.companyTypes;
				$scope.modal.show();
				break;
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
/*	
  $scope.closeModal = function() {
    $scope.modal.hide();
		$scope.listContents = [];
  };	
*/	
	$scope.sendQuery = function(){

		var typesIds = '';
		var countryIds = '';
		var activeIds = '';

		angular.forEach($scope.selectedCompanyTypes, function(value, key){
			console.log(key + "--" + value.name);
			typesIds += value.id + '-';
		});

		angular.forEach($scope.selectedCountries, function(value, key){
			console.log(key + "--" + value.name);
			countryIds += value.id + '-';
		});

		angular.forEach($scope.selectedActive, function(value, key){
			console.log(key + "--" + value.name);
			activeIds += value.id + '-';
		});

		if(typesIds.length == 0)
			typesIds = '0';
		else
			typesIds = typesIds.substring(0, typesIds.length - 1);

		if(countryIds.length == 0)
			countryIds = '0';
		else
			countryIds = countryIds.substring(0, countryIds.length - 1);

		if(activeIds.length == 0)
			activeIds = '0';
		else
			activeIds = activeIds.substring(0, activeIds.length - 1);

		$rootScope.typesIds = typesIds;
		$rootScope.countryIds = countryIds;
		$rootScope.activeIds = activeIds;
		$state.go('tab.companies');
	}

	$scope.clearAll = function(){

		$scope.selectedCompanyTypes = [];
		$scope.selectedCountries = [];
		$scope.selectedActive = [];

		$rootScope.typesIds = '';
		$rootScope.countryIds = '';
		$rootScope.activeIds = '';
	}
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {scope: $scope}).then(function(modal) {
		$scope.modal = modal;
	});
	
})

.controller('CompaniesCtrl', function($scope, $rootScope, Companies, $ionicLoading) {

	$scope.page= 1;
	$scope.companies = [];
	$scope.moreCompanies = true;

	$scope.remove = function(company) {
		Companies.remove(company);
	};

	$ionicLoading.show({
		template: 'Loading...'
	});
	
	$scope.loadMore = function() {

		Companies.query($rootScope.typesIds, $rootScope.countryIds, $rootScope.activeIds, $scope.page).then(function(companies){
			$ionicLoading.hide();
			if(companies.data.length > 0){
				companies.data.forEach(function(item){
					$scope.companies.push(item);
				});
			
				$scope.page++;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			else{
				$scope.moreCompanies = false;
			}
		}).catch(function(e){
			$ionicLoading.hide();
			alert('Failed to load data. Please try again');
		});

	};	

})

.controller('CompanyDetailCtrl', function($scope, $stateParams, Companies, $ionicLoading) {

	$ionicLoading.show({
		template: 'Loading...'
	});
	
	Companies.get($stateParams.companyId).then(function(company){
		$scope.company = company.data;
		$ionicLoading.hide();
	}).catch(function(e){
		$ionicLoading.hide();
		alert('Failed to load data. Please try again');
	});
	
})
//########################################


.controller('ProductsMenuCtrl', function($scope, $rootScope, $ionicModal, $state) {

	$scope.suppliers.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});
	

	$scope.categories.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.subcategories.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});	
	
	$scope.selectedSuppliers = [];
	$scope.selectedCategories = [];
	$scope.selectedSubcategories = [];

	$scope.clicked = function (type, member) {

		if(type=="suppliers"){
		    var index = $scope.selectedSuppliers.indexOf(member);
		    if(index > -1) {
		        $scope.selectedSuppliers.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedSuppliers.push(member);
		        member.selected = true;
		    }
		}
		else if(type=="categories"){
		    var index = $scope.selectedCategories.indexOf(member);
		    if(index > -1) {
		        $scope.selectedCategories.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedCategories.push(member);
		        member.selected = true;
		    }			
		}
		else if(type=="subcategories"){
		    var index = $scope.selectedSubcategories.indexOf(member);
		    if(index > -1) {
		        $scope.selectedSubcategories.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedSubcategories.push(member);
		        member.selected = true;
		    }			
		}
	}

	$scope.openModal = function(whatToShow){
		switch(whatToShow){
			case 'suppliers':
				$scope.modalHeader = "Choose Supplier";
				$scope.modalLabel = "Suppliers";
				$scope.modalType = "suppliers";
				$scope.listContents = $scope.suppliers;
				$scope.modal.show();
				break;
			case 'categories':
				$scope.modalHeader = "Choose Category";
				$scope.modalLabel = "Categories";
				$scope.modalType = "categories";
				$scope.listContents = $scope.categories;
				$scope.modal.show();
				break;
			case 'subcategories':
				$scope.modalHeader = "Choose Subcategory";
				$scope.modalLabel = "Subcategories";
				$scope.modalType = "subcategories";
				$scope.listContents = $scope.subcategories;
				$scope.modal.show();
				break;
		}

	}

	$scope.sendQuery = function(){

		var supIds = '';
		var catIds = '';
		var subIds = '';

		angular.forEach($scope.selectedSuppliers, function(value, key){
			console.log(key + "--" + value.name);
			supIds += value.id + '-';
		});

		angular.forEach($scope.selectedCategories, function(value, key){
			console.log(key + "--" + value.name);
			catIds += value.id + '-';
		});

		angular.forEach($scope.selectedSubcategories, function(value, key){
			console.log(key + "--" + value.name);
			subIds += value.id + '-';
		});

		if(supIds.length == 0)
			supIds = '0';
		else
			supIds = supIds.substring(0, supIds.length - 1);

		if(catIds.length == 0)
			catIds = '0';
		else
			catIds = catIds.substring(0, catIds.length - 1);

		if(subIds.length == 0)
			subIds = '0';
		else
			subIds = subIds.substring(0, subIds.length - 1);

		$rootScope.supIds = supIds;
		$rootScope.catIds = catIds;
		$rootScope.subIds = subIds;
		$state.go('tab.products');
	}

	$scope.clearAll = function(){

		$scope.selectedSuppliers = [];
		$scope.selectedCategories = [];
		$scope.selectedSubcategories = [];

		$rootScope.supIds = '';
		$rootScope.catIds = '';
		$rootScope.subIds = '';
	}

	$ionicModal.fromTemplateUrl('templates/modal.html', {scope: $scope}).then(function(modal) {
		$scope.modal = modal;
	});

})


.controller('ProductsCtrl', function($scope, $rootScope, Products, $ionicLoading) {

	$scope.page= 1;
	$scope.products = [];
	$scope.moreProducts = true;

	$scope.remove = function(product) {
		Products.remove(product);
	};

	$scope.loadMore = function() {

		//Products.page($scope.page).then(function(products){
		Products.query($rootScope.supIds, $rootScope.catIds, $rootScope.subIds, $scope.page).then(function(products){

			if(products.data.length > 0){
				products.data.forEach(function(item){
					$scope.products.push(item);
				});
				
				$scope.page++;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			else{
				$scope.moreProducts = false;
			}
		}).catch(function(e){
			alert('Failed to load data. Please try again');
		});
	};	
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products, $ionicLoading) {

   $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };
	
	$ionicLoading.show({
		template: 'Loading...'
	});

	Products.get($stateParams.productId).then(function(product){
		$scope.product = product.data;
		$ionicLoading.hide();
	}).catch(function(e){
		$ionicLoading.hide();
		alert('Failed to load data. Please try again');
	});
	
})



.controller('AccountCtrl', function($scope, $rootScope, Categories, Subcategories, Suppliers, Customers, Transporters, Countries, States, $ionicLoading) {
  $scope.reloadData = function(){

	$rootScope.loading = true;
	$rootScope.loadSuccess = true;
	$rootScope.responses = 0;
	$ionicLoading.show({
		template: 'Loading initial data. Please wait...'
	});

	$rootScope.$watch('responses', function(){
		if($rootScope.responses >= 7){
		$rootScope.loading = false;
		$ionicLoading.hide();

		if($rootScope.loadSuccess == false){
			alert('Loading initial data failed. Please make sure you have turned on the VPN')
		}
		}
	});
		
	Categories.all().then(function(categories){
		console.log('loaded categories1');
			$rootScope.categories = [];
			$rootScope.responses++;
		console.log($rootScope.responses);

			categories.data.forEach(function(value) {
				$rootScope.categories.push({id: value.Id, name: value.ProductCategoryName});
			});

			//console.log($rootScope.categories);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading categories');
	});
		
	Subcategories.all().then(function(subcategories){
		$rootScope.subcategories = [];

		subcategories.data.forEach(function(value) {
		$rootScope.subcategories.push({id: value.id, name: value.Name});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.subcategories);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading subcategories');
	});

	Suppliers.all().then(function(suppliers){
		$rootScope.suppliers = [];

		suppliers.data.forEach(function(value) {
		$rootScope.suppliers.push({id: value.Id, name: value.CompanyName});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.suppliers);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading suppliers');
	});
		
	Customers.all().then(function(customers){
		$rootScope.customers = [];

		customers.data.forEach(function(value) {
		$rootScope.customers.push({id: value.Id, name: value.CompanyName});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.customers);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading customers');
	});

	Transporters.all().then(function(transporters){
		$rootScope.transporters = [];

		transporters.data.forEach(function(value) {
		$rootScope.transporters.push({id: value.Id, name: value.CompanyName});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.transporters);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading transporters');
	});

	Countries.all().then(function(countries){
		$rootScope.countries = [];

		countries.data.forEach(function(value) {
		$rootScope.countries.push({id: value.country, name: value.country});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.countries);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading countries');
	});

	States.all().then(function(states){
		$rootScope.states = [];

		states.data.forEach(function(value) {
		$rootScope.states.push({id: value.id, name: value.StateName});
		});
			$rootScope.responses++;
		
		//console.log($rootScope.states);
		}, function(){
			$rootScope.responses++;
		$rootScope.loadSuccess = false;
		console.log('failed loading states');
	});
  };


});
