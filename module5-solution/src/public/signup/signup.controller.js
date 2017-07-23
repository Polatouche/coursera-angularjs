(function() {
  angular.module('public')
  .controller('SignupController',SignupController);

  SignupController.$inject = ['info','StorageService','MenuService'];
  function SignupController(info,StorageService,MenuService){
    var signupCtrl = this;
    signupCtrl.itemFail = false;
    signupCtrl.saving = false;
    signupCtrl.saved = false;
    signupCtrl.info = info?info:{};

    signupCtrl.isItemValid = function(){
      return MenuService.getMenuItem(signupCtrl.info.menuitem).then(
        function(response){
          return response;
        }
      );
    };
    
    signupCtrl.saveInfo = function(){
      signupCtrl.saved = false;
      signupCtrl.saving = true;
      signupCtrl.itemFail = false; // reset if needed
      signupCtrl.isItemValid().then(
        function(response){
          signupCtrl.saving = false;
          if(response){
            StorageService.saveInfo(signupCtrl.info);
            signupCtrl.saved = true;
          }else{
            signupCtrl.itemFail = true;
          }
        },
        function(why){
          signupCtrl.saving = false;
        },
      );
    };
      
  };
}());
