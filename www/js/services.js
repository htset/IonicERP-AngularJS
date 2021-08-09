angular.module('ionicerp.services', [])

.factory('Products', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var products = [];

  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/products/");
/*			.then(function(response){
				products = response.data;
				return products;
			});
*/    },

    page: function(num) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/products/page/"+num);
    },

    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/products/"+id);
    },

    query: function(supIds, catIds, subIds, pageNum) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/products/combinedQuery/"+supIds+'/'+catIds+'/'+subIds+'/'+pageNum+'/');
    }

  };
})

.factory('Categories', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/categories/");
    },
    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/categories/"+id);
    }
  };
})

.factory('Suppliers', function($http) {
  return {
    all: function() {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/suppliers");
    },
    get: function(id) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/"+id);
    }
  };
})

.factory('Customers', function($http) {
  return {
    all: function() {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/customers");
    },
    get: function(id) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/"+id);
    }
  };
})

.factory('Transporters', function($http) {
  return {
    all: function() {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/transporters");
    },
    get: function(id) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/"+id);
    }
  };
})

.factory('Subcategories', function($http) {
  return {
    all: function() {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/subcategories/");
    },
    get: function(id) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/subcategories/"+id);
    }
  };
})

.factory('Countries', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/countries/");
    }
  };
})

.factory('States', function($http) {
  return {
    all: function() {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/states/");
    },
    get: function(id) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/states/"+id);
    }
  };
})

.factory('Companies', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/");
    },

    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/"+id);
    },


    query: function(companyTypeIds, countryIds, activeIds, pageNum) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/companies/combinedQuery/"+companyTypeIds+'/'+countryIds+'/'+activeIds+'/'+pageNum+'/');
    }
		
  };
})

.factory('Contacts', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/contacts/");
    },

    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/contacts/"+id);
    },


    query: function(countryIds, activeIds, pageNum) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/contacts/combinedQuery/"+countryIds+'/'+activeIds+'/'+pageNum+'/');
    }
		
  };
})

.factory('Orders', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/orders/");
    },

    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/orders/"+id);
    },

    query: function(supplierIds, customerIds, transporterIds, stateIds, startDate, endDate, pageNum) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/orders/combinedQuery/"+supplierIds+'/'+customerIds+'/'+transporterIds+'/'+stateIds+'/'+startDate+'/'+endDate+'/'+pageNum+'/');
    }
		
  };
})

.factory('Invoices', function($http) {
  return {
    all: function() {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/invoices/");
    },

    get: function(id) {
			return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/invoices/"+id);
    },

    query: function(supplierIds, customerIds, transporterIds, pageNum) {
      return $http.get("http://192.168.1.2:8080/IonicERPMobile/index.php/invoices/combinedQuery/"+supplierIds+'/'+customerIds+'/'+transporterIds+'/'+pageNum+'/');
    }
		
  };
});
