const hre = require("hardhat");

deploySchapendoesTokenContractAndMintTokens()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

async function deploySchapendoesTokenContractAndMintTokens() {
  const Schapendoes = await hre.ethers.getContractFactory("SchapendoesToken");
  const schapendoes = await Schapendoes.deploy("SchapendoesToken", "LILY", 1000000000000000,
      "0x8d42959EA8494732d7e559dFC7A6f2865E087098", "0x6c2b498a572A83a9AeF2DBcFE56CAa46f82058A5");

  await logContractDetails(schapendoes)

  await schapendoes.deployed();
}

async function logContractDetails(contract) {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();

    console.log("")
    console.log("+--------------------------------------------------------------------------------------------+")
    console.log("   Token name:        " + name);
    console.log("   Token symbol:      " + symbol);
    console.log("   Token address:     " + contract.address)
    console.log("   Token decimals:    " + decimals);
    console.log("   Creation has:      " + contract.deployTransaction.hash)
    console.log("+--------------------------------------------------------------------------------------------+")
    console.log("")
}

