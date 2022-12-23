// contract와 연결될 함수 

App = {
    web3: null,
    contracts: {},
    url: 'http://127.0.0.1:7545',
    network_id: 1337,
    currentAccount: '',
//    personNumber: '',
//    grades: null,
    init: function () {
      return App.initWeb3();
    },
  
    initWeb3: function () {
      if (typeof web3 !== 'undefined') {
        App.web3 = new Web3(Web3.givenProvider);
      } else {
        App.web3 = new Web3(App.url);
      }
      ethereum.enable();
      return App.initContract();
    },
  
    initContract: function () {
      $.getJSON('Funding.json', function (data) {
        App.contracts.Funding = new App.web3.eth.Contract(data.abi, data.networks[App.network_id].address, {});
        App.currentAccount = App.web3._provider.selectedAddress;
      })
  
      return App.bindEvents();
    },

    bindEvents: function () {
        //상품등록
        function permission(){
            alert($(this).find("#pId").val() + " " + $(this).find("#price").val());
        }
        $("#addblock").on('click', function(){
            var index = $(this).attr('value')
            //alert($("#price"+index).val());
            App.handleRegistration($("#pId"+index).val(), $("#price"+index).val());
        });
    
        //구매 
        // $(document).on('click', '#login', function () {
        //   App.handleLogin(jQuery('#personNumber').val());
        // });
    
      },

      handleRegistration: function(pId, price){
        let option = { from: App.currentAccount }
        App.contracts.Funding.methods.productRegist(pId, price)
        .send(option)
        .on('receipt',(r)=>{
            let events = r.events;
            alert(JSON.parse(events));
        })
        .on('error', err =>{
            console.log(err);
        });

      },

      balanceOf: function(){

      }

    }
    $(function () {
        $(window).load(function () {
          App.init();
          toastr.options = {
            "positionClass": "right newtoast",
            "preventDuplicates": true,
            "closeButton": true
          };
        });
      });
