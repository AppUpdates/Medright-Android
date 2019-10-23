angular.module('starter.payPalService', [])

.factory('PaypalService', ['$q', '$ionicPlatform', 'shopSettings', '$filter', '$timeout', function ($q, $ionicPlatform, shopSettings, $filter, $timeout) {
  var init_defer;
  
  var service = {
  initPaymentUI: initPaymentUI,
  createPayment: createPayment,
  configuration: configuration,
  onPayPalMobileInit: onPayPalMobileInit,
  makePayment: makePayment,
  onCardIOComplete: onCardIOComplete,
  onUserCanceled: onUserCanceled
  };

  function onCardIOComplete(card) {
    console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
    localStorage.setItem('CardDetails',JSON.stringify(card, null, 4));
  }

  function onUserCanceled(result){
    console.log(result);
  }

  function initPaymentUI() {
  init_defer = $q.defer();
  $ionicPlatform.ready().then(function () {
  var clientIDs = {
  "PayPalEnvironmentProduction": shopSettings.payPalProductionId,
  "PayPalEnvironmentSandbox": shopSettings.payPalSandboxId
  };
  PayPalMobile.init(clientIDs, onPayPalMobileInit);
  });
  return init_defer.promise;
  }
 
  function createPayment(Fees, name) {
  // "Sale == > immediate payment
  // "Auth" for payment authorization only, to be captured separately at a later time.
  // "Order" for taking an order, with authorization and capture to be done separately at a later time.
  var payment = new PayPalPayment("" + Fees, "USD", "" + name, "Sale");
  return payment;
  }
  
  function configuration() {
  // for more options see `paypal-mobile-js-helper.js`
  var config = new PayPalConfiguration({merchantName: shopSettings.payPalShopName, merchantPrivacyPolicyURL: shopSettings.payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: shopSettings.payPalMerchantUserAgreementURL});
  return config;
  }
  function onPayPalMobileInit() {
  $ionicPlatform.ready().then(function () {
  // must be called
  // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
  PayPalMobile.prepareToRender(shopSettings.payPalEnv, configuration(), function () {
  $timeout(function () {
  init_defer.resolve();
  });
  });
  });
  }
  
  function makePayment(Fees,name) {
  var defer = $q.defer();
  Fees = $filter('number')(Fees, 2);
  $ionicPlatform.ready().then(function () {
  PayPalMobile.renderSinglePaymentUI(createPayment(Fees, name), function (result) {
  $timeout(function () {
  defer.resolve(result);
  });
  }, function (error) {
  $timeout(function () {
  defer.reject(error);
  });
  });
  });
  return defer.promise;
  }
  // function makePayment(Fees,name) {
    // var paymentDetails = new PayPalPaymentDetails(
    //  "15.00", // subtotal (amount ex shipping and tax)
    //  "3.00", // shipping
    //  "2.00"  // tax
    // );

    // var payment = new PayPalPayment(
    //   "20.00", // amount (the sum of the fields above)
    //   "USD",   // currency (in ISO 4217 format)
    //   "Telerik T-Shirt", // description of the payment
    //   "Sale",  // Sale (immediate payment) or Auth (authorization only)
    //   paymentDetails // the object prepared above, optional
    // );

    // PayPalMobile.renderSinglePaymentUI(
    //   payment,
    //   function(payment) {alert("payment success: " + JSON.stringify(payment))},
    //   function(errorresult) {alert(errorresult)}
    // );
    
    // PayPalMobile.renderFuturePaymentUI(
    //   function(authorization) {alert("authorization: " + JSON.stringify(authorization))},
    //   function(errorresult) {alert("err"+ JSON.stringify(errorresult))}
    // );

    //directly go for only card option
    

      
  // }  
  return service;
  }]);