// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionicerp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionicerp.services' is found in services.js
// 'ionicerp.controllers' is found in controllers.js
angular.module('ionicerp', ['ionic', 'ionicerp.controllers', 'ionicerp.controllerContacts', 'ionicerp.controllerOrders', 'ionicerp.controllerPayments', 'ionicerp.services', 'ionic-datepicker', 'angularMoment'])

.run(function($ionicPlatform, $rootScope, Categories, Subcategories, Suppliers, Customers, Transporters, Countries, States, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

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

	$rootScope.companyTypes = [];	
	$rootScope.companyTypes.push({id: "SPL", name: "Suppliers"});
	$rootScope.companyTypes.push({id: "CST", name: "Customers"});
	$rootScope.companyTypes.push({id: "TRN", name: "Transporters"});
	$rootScope.companyTypes.push({id: "ART", name: "Artists"});
	$rootScope.companyTypes.push({id: "VAR", name: "Various"});

	$rootScope.active = [];
	$rootScope.active.push({id: 'I', name: "Inactive"});
	$rootScope.active.push({id: 'A', name: "Active"});
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.menu', {
    url: '/menu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'MenuCtrl'
      }
    }
  })

  .state('tab.products-menu', {
    url: '/productsMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/product-menu.html',
        controller: 'ProductsMenuCtrl'
      }
    }
  })

  .state('tab.products', {
		url: '/products',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-products.html',
				controller: 'ProductsCtrl'
			}
		}
	})

  .state('tab.product-detail', {
		url: '/products/:productId',
		views: {
			'tab-menu': {
				templateUrl: 'templates/product-detail.html',
				controller: 'ProductDetailCtrl'
			}
		}
	})

  .state('tab.companies-menu', {
    url: '/companiesMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/companies-menu.html',
        controller: 'CompaniesMenuCtrl'
      }
    },
		onEnter: function () {
			console.log("entered bottom state's onEnter function");

		}		
  })

  .state('tab.companies', {
		url: '/companies',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-companies.html',
				controller: 'CompaniesCtrl'
			}
		}
	})

  .state('tab.company-detail', {
		url: '/companies/:companyId',
		views: {
			'tab-menu': {
				templateUrl: 'templates/company-detail.html',
				controller: 'CompanyDetailCtrl'
			}
		}
	})

  .state('tab.contacts-menu', {
    url: '/contactsMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/contacts-menu.html',
        controller: 'ContactsMenuCtrl'
      }
    },
		onEnter: function () {
			console.log("entered bottom state's onEnter function");

		}		
  })

  .state('tab.contacts', {
		url: '/contacts',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-contacts.html',
				controller: 'ContactsCtrl'
			}
		}
	})

  .state('tab.contact-detail', {
		url: '/contacts/:contactId',
		views: {
			'tab-menu': {
				templateUrl: 'templates/contact-detail.html',
				controller: 'ContactDetailCtrl'
			}
		}
	})

  .state('tab.orders-menu', {
    url: '/ordersMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/ordersMenu.html',
        controller: 'OrdersMenuCtrl'
      }
    }
  })

  .state('tab.orders', {
		url: '/orders',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-orders.html',
				controller: 'OrdersCtrl'
			}
		}
	})

  .state('tab.order-detail', {
		url: '/orders/:orderId',
		views: {
			'tab-menu': {
				templateUrl: 'templates/order-detail.html',
				controller: 'OrderDetailCtrl'
			}
		}
	})
	
  .state('tab.order-create-menu', {
    url: '/orderCreateMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/orderCreateMenu.html',
        controller: 'OrderCreateMenuCtrl'
      }
    }
  })

  .state('tab.orderCreate', {
		url: '/orderCreate',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-orderCreate.html',
				controller: 'OrderCreateCtrl'
			}
		}
	})

  .state('tab.payments-menu', {
    url: '/paymentsMenu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/paymentsMenu.html',
        controller: 'PaymentsMenuCtrl'
      }
    }
  })

  .state('tab.payments', {
		url: '/payments',
		views: {
			'tab-menu': {
				templateUrl: 'templates/tab-payments.html',
				controller: 'PaymentsCtrl'
			}
		}
	})

  .state('tab.payment-detail', {
		url: '/payments/:paymentId',
		views: {
			'tab-menu': {
				templateUrl: 'templates/payment-detail.html',
				controller: 'PaymentDetailCtrl'
			}
		}
	})
	
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');
	
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
//      from: new Date(2012, 8, 1),
//      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false
//      disableWeekdays: [6],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
