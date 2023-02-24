const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.01")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    //call the deposit function on the weth contract
    // abi ✔ , contract address ✔
    // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const interfaceWeth = await ethers.getContractAt(
        "IWeth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    )
    const txn = await interfaceWeth.deposit({ value: AMOUNT })
    await txn.wait(1)
    const wethBalance = await interfaceWeth.balanceOf(deployer)
    console.log(`Received ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
