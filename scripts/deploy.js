require('dotenv').config();

async function main() {
  const Token = await ethers.getContractFactory('CTKN');
  const token = await Token.deploy();

  console.log(`Contract address: ${token.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
