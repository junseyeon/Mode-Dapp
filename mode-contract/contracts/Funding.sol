// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Funding{
    address payable public chairperson;

    struct Buyer{   // From 
     // uint userId;
     // address buyer;   // 구매자 address

    //    uint reqId;      // 거래ID값 --------db와 동일하게 하기..
        uint pId;       //프로젝트 reg_id
        uint price;     // 지불해야 할 금액 / 한 금액
        address seller;
    }
    struct Product{  // to
    //    uint regId;     
        uint pId;        // 프로젝트 reg_id
        uint price;       // 판매 가격 
        address seller;   // 판매자 address
    }

    mapping (address=>uint) escrow;     // 판매자 수익 
   // mapping (address=>uint) modeProduct;     //등록된 프로젝트인지 확인
    mapping(address => Buyer[]) buyers;            // key value형식으로 활용 됨
    mapping(address => Product[]) products;
    mapping(address => uint) settledReqID;      // 정산 여부 
    mapping(uint => uint) useProject;        //1 사용  0미사용
    mapping(address => uint) membership;    
    

    modifier onlyChairperson{
        require(msg.sender == chairperson);
        _;
    }
   
    modifier onlySeller{
        require(membership[msg.sender]==1);
        _;
    }

    //  modifier onlyMember {
    //     require(membership[msg.sender]==1);
    //     _;
    // }
    // modifier onlyModeProduct{
    //     require(modeProduct[msg.sender]==1);
    //     _;
    // }

    event SentEvent(address from, address to, uint amount);
    event Regist(address from, uint pId, uint price);
    event Buy(address from, uint pId, uint price, address seller);
    event Log (Buyer a, uint p);
    event Log2 (Product a, uint p);

    constructor() public{  //배포시 동작 
        chairperson = payable(msg.sender);    
    }

    receive() external payable {}   // 메타마스크 에서 직접 보낼 때

    function transfer(address payable _to, uint amount) public payable {      
        require (msg.sender.balance >= amount , "your balance is not enough");
        bool sent = _to.send(amount);
        require(sent, "failure! ether not sent");
        emit SentEvent( msg.sender, _to , amount);    //-- 이벤트 발생  
    }

    // 프로젝트 등록  
    function productRegist(uint pId, uint price) external payable {    
        Product memory p = Product({
            pId : pId,
            price : price,
            seller : msg.sender
        });
        products[msg.sender].push(p);
  //    products[msg.sender] = Product( pId, price, msg.sender);

        useProject[pId] = 1;    // pId사용 여부
        membership[msg.sender] = 1;

        transfer(chairperson, msg.value);
        emit Regist(msg.sender,pId, price);

    }

    function unregist(uint pId) onlyChairperson external{
        useProject[pId]=0;
        membership[msg.sender] = 0;
    //    settlementOfCharge(pId);
    }

    
    // 상품 결제 + 구매 이력 남음 
    function buyRequest(uint blockRegId, uint pId, address payable seller) external payable{
        emit Log2(products[seller][blockRegId],msg.value);
        require(products[seller][blockRegId].pId == pId, "this is not registerd project"); 
        require(useProject[pId]==1, "End Project");  
        // 돈 단위에 따라서 파악..
        require(products[seller][blockRegId].price == msg.value/1000000000000000000 ); //, "given price does not match!"
        require (msg.sender.balance >= msg.value ); //, "your balance is not enough"

        Buyer memory b = Buyer({
            pId: pId,
            price: msg.value,
            seller: seller
        });
        buyers[msg.sender].push(b); 
        emit Buy(msg.sender, pId, msg.value, seller);

    //    buyers[msg.sender] = Buyer(reqId, pId, msg.value, seller);   //-- mappging에 struct배열 아닐 때 
    //    escrow[seller] = msg.value;  
        transfer(seller, msg.value /100 * 90);
        transfer(chairperson, msg.value/100*10);
    } 

      // 환불진행  -- 환불 요청은 웹에서 
      // req안 맞으면 바로 revert됨 
    function refundApply(address payable refundAccount, uint reqId) onlySeller external payable{
        uint refundPrice = buyers[refundAccount][reqId].price;
        require(buyers[refundAccount][reqId].seller == msg.sender, "your not this projectmanager");
        require( refundPrice > 0, "you don't buy anything");
        emit Log(buyers[refundAccount][reqId] , refundPrice );
        emit Log(buyers[refundAccount][reqId] , msg.value );

        transfer(refundAccount, msg.value);
    }

    // function settlementOfCharge(uint pId) public payable{                 // 본인 escrow -> 본인 실제 지갑
    //     address account = msg.sender;
    //     uint money = msg.value;
    //     //    require(escrow[account]!=0,"정산할 금액이 없습니다");
    //     //    require(settledReqID[account]==pId, "already settled or doesn't match any account" );
    //     //    settledReqID[account] = pId;  

    //     transfer(chairperson, escrow[account] / 100 * 10);  
    //     escrow[account] = escrow[account] - escrow[account] / 100 * 10;

    //     //맞는지 확인 필요
    //     transfer( payable(account), escrow[account]);    //  payable(account).transfer(escrow[account]);
    //     escrow[account] = 0;     
    // }

    function balanceOf() external view returns(uint){
        return msg.sender.balance;
       // return address(this).balance;
    }

    // function balanceOfSeller() external view returns(uint){         // 현재 에스크로에 잔액  (수수료 떼기 전) 
    //     return escrow[address(this)];
    // }

    

}

// if(msg.sender != chairperson) {revert();}   --tx막음
// if문 대신 require 사용 
// HYPERLINK "htttp://sss"sender.vote = toProposal;              책 85p
// transfer로 실제 토큰 주고 받음 
// 블록체인에 저장할 필요 없는 로컬 변수는 memeory타입  
// mapping 값 받아오는 문법 :: uint playerTwoHighScore = 매핑변수[adress값];     -- default=0

// + event emit으로 이벤트 수행