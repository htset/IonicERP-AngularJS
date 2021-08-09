angular.module('ionicerp.controllerOrders', [])

.controller('OrdersMenuCtrl', function($scope, $rootScope, $ionicModal, $state, ionicDatePicker) {

	$scope.suppliers.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.customers.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.transporters.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.states.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.selectedSuppliers = [];
	$scope.selectedCustomers = [];
	$scope.selectedTransporters = [];
	$scope.selectedStates = [];

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
		else if(type=="customers"){
		    var index = $scope.selectedCustomers.indexOf(member);
		    if(index > -1) {
		        $scope.selectedCustomers.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedCustomers.push(member);
		        member.selected = true;
		    }			
		}
		else if(type=="transporters"){
		    var index = $scope.selectedTransporters.indexOf(member);
		    if(index > -1) {
		        $scope.selectedTransporters.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedTransporters.push(member);
		        member.selected = true;
		    }			
		}
		else if(type=="states"){
		    var index = $scope.selectedStates.indexOf(member);
		    if(index > -1) {
		        $scope.selectedStates.splice(index, 1);
		        member.selected = false;
		    } else {
		        $scope.selectedStates.push(member);
		        member.selected = true;
		    }			
		}
	}
	
	$scope.openModal = function(whatToShow){
		
		switch(whatToShow){
			case 'suppliers':
				$scope.modalHeader = "Choose Suppliers";
				$scope.modalLabel = "Company Types";
				$scope.modalType = "suppliers";
				$scope.listContents = $scope.suppliers;
				$scope.modal.show();
				break;
			case 'customers':
				$scope.modalHeader = "Choose Customers";
				$scope.modalLabel = "Customers";
				$scope.modalType = "customers";
				$scope.listContents = $scope.customers;
				$scope.modal.show();
				break;
			case 'transporters':
				$scope.modalHeader = "Choose Transporters";
				$scope.modalLabel = "Transporters";
				$scope.modalType = "transporters";
				$scope.listContents = $scope.transporters;
				$scope.modal.show();
				break;
			case 'states':
				$scope.modalHeader = "Choose States";
				$scope.modalLabel = "States";
				$scope.modalType = "states";
				$scope.listContents = $scope.states;
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

		var supplierIds = '';
		var customerIds = '';
		var transporterIds = '';
		var stateIds = '';

		angular.forEach($scope.selectedSuppliers, function(value, key){
			console.log(key + "--" + value.name);
			supplierIds += value.id + '-';
		});

		angular.forEach($scope.selectedCustomers, function(value, key){
			console.log(key + "--" + value.name);
			customerIds += value.id + '-';
		});

		angular.forEach($scope.selectedTransporters, function(value, key){
			console.log(key + "--" + value.name);
			transporterIds += value.id + '-';
		});

		angular.forEach($scope.selectedStates, function(value, key){
			console.log(key + "--" + value.name);
			stateIds += value.id + '-';
		});

		if(supplierIds.length == 0)
			supplierIds = '0';
		else
			supplierIds = supplierIds.substring(0, supplierIds.length - 1);

		if(customerIds.length == 0)
			customerIds = '0';
		else
			customerIds = customerIds.substring(0, customerIds.length - 1);

		if(transporterIds.length == 0)
			transporterIds = '0';
		else
			transporterIds = transporterIds.substring(0, transporterIds.length - 1);

		if(stateIds.length == 0)
			stateIds = '0';
		else
			stateIds = stateIds.substring(0, stateIds.length - 1);

		$rootScope.supplierIds = supplierIds;
		$rootScope.customerIds = customerIds;
		$rootScope.transporterIds = transporterIds;
		$rootScope.stateIds = stateIds;
		$rootScope.startDate = (typeof $scope.selectedStartDate == 'undefined' || $scope.selectedStartDate == '')?'0':moment($scope.selectedStartDate).format('YYYYMMDD');
		$rootScope.endDate = (typeof $scope.selectedEndDate == 'undefined' || $scope.selectedEndDate == '')?'0':moment($scope.selectedEndDate).format('YYYYMMDD');
		
		if($rootScope.startDate != '0' && $rootScope.endDate != '0' && $rootScope.startDate > $rootScope.endDate){
			alert('The date range is not correct. Please try again');
			return;
		}
		$state.go('tab.orders');
	}

	$scope.clearAll = function(){

		$scope.selectedSuppliers = [];
		$scope.selectedCustomers = [];
		$scope.selectedTransporters = [];
		$scope.selectedStates = [];
		$scope.selectedStartDate = '';
		$scope.selectedEndDate = '';

		$rootScope.supplierIds = '';
		$rootScope.customerIds = '';
		$rootScope.transporterIds = '';
		$rootScope.stateIds = '';
	}
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {scope: $scope}).then(function(modal) {
		$scope.modal = modal;
	});

	var modalDate = {
		callback: function (val) {  //Mandatory
			console.log('Return value from the datepicker popup is : ' + val, new Date(val));
			if($scope.startStop == 'start')
				$scope.selectedStartDate = new Date(val);
			else if($scope.startStop == 'stop')
				$scope.selectedEndDate = new Date(val);
			
		},
		mondayFirst: true,          //Optional
		closeOnSelect: true,       //Optional
		//templateType: 'modal'       //Optional
		templateType: 'popup'       //Optional
	};

	$scope.openDatePicker = function(startStop){
		$scope.startStop = startStop;
		if(startStop == 'start'){
			if(typeof $scope.selectedStartDate == 'undefined' || $scope.selectedStartDate == '')
				modalDate.inputDate = new Date();
			else
				modalDate.inputDate = new Date($scope.selectedStartDate);
		}
		else if(startStop == 'stop'){
			if(typeof $scope.selectedEndDate == 'undefined' || $scope.selectedEndDate == '')
				modalDate.inputDate = new Date();
			else
				modalDate.inputDate = new Date($scope.selectedEndDate);			
		}
		ionicDatePicker.openDatePicker(modalDate);
	};	
		
})

.controller('OrdersCtrl', function($scope, $rootScope, Orders) {
	$scope.page= 1;
	$scope.orders = [];
	$scope.moreOrders = true;

	$scope.formatDate = function(date){

			var dateOut = new Date(date);
			return dateOut;
	};

	$scope.remove = function(order) {
		Orders.remove(order);
	};

	$scope.loadMore = function() {

		console.log('Start date: ' + $rootScope.startDate);
		console.log('End date: ' + $rootScope.endDate);
	
		Orders.query($rootScope.supplierIds, $rootScope.customerIds, $rootScope.transporterIds, $rootScope.stateIds, $rootScope.startDate, $rootScope.endDate, $scope.page).then(function(orders){
			if(orders.data.length > 0){
				orders.data.forEach(function(item){
					$scope.orders.push(item);
				});
			
				$scope.page++;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			else{
				$scope.moreOrders = false;
			}
		}).catch(function(){
			alert('Failed to load data. Please try again');
		});

	};	
})


.controller('OrderDetailCtrl', function($scope, $stateParams, Orders, $ionicLoading) {
	$scope.formatDate = function(date){
			var dateOut = new Date(date);
			return dateOut;
	};

    $ionicLoading.show({
      template: 'Loading...'
    });

	Orders.get($stateParams.orderId).then(function(order){
		$scope.order = order.data;
		$ionicLoading.hide();
	}).catch(function(){
		$ionicLoading.hide();
		alert('Failed to load data. Please try again');
	});
	
})

/*****************************************************************/

.controller('OrderCreateMenuCtrl', function($scope, $rootScope, $ionicModal, $state) {

	$scope.suppliers.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.customers.forEach(function(item){
		if(item.selected != undefined)
			item.selected = false;
	});

	$scope.selectedSuppliers = [];
	$scope.selectedCustomers = [];

	$scope.clicked = function (type, member) {

		if(type=="suppliers"){
			if(typeof $scope.selectedSuppliers[0] !== 'undefined'){
				$scope.selectedSuppliers[0].selected = false;
				$scope.selectedSuppliers.splice(0, 1);
			}
			$scope.selectedSuppliers.push(member);
			member.selected = true;
		}
		else if(type=="customers"){
			if(typeof $scope.selectedCustomers[0] !== 'undefined'){
				$scope.selectedCustomers[0].selected = false;
				$scope.selectedCustomers.splice(0, 1);
			}
			$scope.selectedCustomers.push(member);
			member.selected = true;
		}
	}
	
	$scope.openModal = function(whatToShow){
		
		switch(whatToShow){
			case 'suppliers':
				$scope.modalHeader = "Choose Supplier";
				$scope.modalLabel = "Company Types";
				$scope.modalType = "suppliers";
				$scope.listContents = $scope.suppliers;
				$scope.modal.show();
				break;
			case 'customers':
				$scope.modalHeader = "Choose Customer";
				$scope.modalLabel = "Customers";
				$scope.modalType = "customers";
				$scope.listContents = $scope.customers;
				$scope.modal.show();
				break;
		}
	}

	$scope.createOrder = function(){

		if(typeof $scope.selectedSuppliers[0] == 'undefined' || typeof $scope.selectedCustomers[0] == 'undefined'){
			alert('You should select a Supplier and a Customer');
			return;
		}		

		$rootScope.supplierId = $scope.selectedSuppliers[0].id;
		$rootScope.customerId = $scope.selectedCustomers[0].id;
		$state.go('tab.orderCreate');
	}

	$scope.clearAll = function(){

		$scope.selectedSuppliers = [];
		$scope.selectedCustomers = [];

		$rootScope.supplierId = '';
		$rootScope.customerId = '';
	}
	
	$ionicModal.fromTemplateUrl('templates/modal.html', {scope: $scope}).then(function(modal) {
		$scope.modal = modal;
	});

})

.controller('OrderCreateCtrl', function($scope, $rootScope, Orders) {
	
	
})
