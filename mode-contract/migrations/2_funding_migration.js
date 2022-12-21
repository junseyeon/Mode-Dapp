var Funding = artifacts.require("Funding");   // 파일명 아니라 contract명 

module.exports = function(deployer) {
  deployer.deploy(Funding);    // 생성자 실행
};
