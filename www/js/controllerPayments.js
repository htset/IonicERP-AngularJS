angular.module('ionicerp.controllerPayments', [])

.controller('PaymentsMenuCtrl', function($scope, $rootScope, $ionicModal, $state, ionicDatePicker) {

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

	$scope.selectedSuppliers = [];
	$scope.selectedCustomers = [];
	$scope.selectedTransporters = [];

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

		$rootScope.supplierIds = supplierIds;
		$rootScope.customerIds = customerIds;
		$rootScope.transporterIds = transporterIds;
		$rootScope.startDate = $scope.selectedStartDate;
		$rootScope.endDate = $scope.selectedEndDate;
		$state.go('tab.payments');
	}

	$scope.clearAll = function(){

		$scope.selectedSuppliers = [];
		$scope.selectedCustomers = [];
		$scope.selectedTransporters = [];
		$scope.selectedStartDate = '';
		$scope.selectedEndDate = '';

		$rootScope.supplierIds = '';
		$rootScope.customerIds = '';
		$rootScope.transporterIds = '';
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
		disableWeekdays: [0],       //Optional
		closeOnSelect: true,       //Optional
		templateType: 'modal'       //Optional
	};

	$scope.openDatePicker = function(startStop){
		$scope.startStop = startStop;
		ionicDatePicker.openDatePicker(modalDate);
	};	
		
})

.controller('PaymentsCtrl', function($scope, $rootScope, Invoices) {

	$scope.formatDate = function(date){
			var dateOut = new Date(date);
			return dateOut;
	};

	$scope.page= 1;
	$scope.invoices = [];
	$scope.moreInvoices = true;

	$scope.remove = function(invoice) {
		Invoices.remove(invoice);
	};

	$scope.loadMore = function() {

		console.log($rootScope.startDate);
		console.log($rootScope.endDate);

		Invoices.query($rootScope.supplierIds, $rootScope.customerIds, $rootScope.transporterIds, $scope.page).then(function(invoices){
			
			if(invoices.data.length > 0){
				invoices.data.forEach(function(item){
					$scope.invoices.push(item);
				});
			
				$scope.page++;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			else{
				$scope.moreInvoices = false;
			}
		}).catch(function(){
			alert('Failed to load data. Please try again');
		});
	};	
})


.controller('PaymentDetailCtrl', function($scope, $stateParams, Invoices, $ionicLoading) {

	$scope.formatDate = function(date){

			var dateOut = new Date(date);
			return dateOut;
	};

    $ionicLoading.show({
      template: 'Loading...'
    });

	Invoices.get($stateParams.paymentId).then(function(invoice){
		$scope.invoice = invoice.data;
		$ionicLoading.hide();
	}).catch(function(){
		$ionicLoading.hide();
		alert('Failed to load data. Please try again');
	});
	
})


