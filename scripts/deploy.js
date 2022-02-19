const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("meme");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
    let txn = await domainContract.registerName("comrade",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain comrade.meme");
    
    txn = await domainContract.setRecord("comrade", "Am I a comrade meme??");
    await txn.wait();
    console.log("Set record for comrade.meme");
  
    const address = await domainContract.getAddress("comrade");
    console.log("Owner of domain comrade:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();