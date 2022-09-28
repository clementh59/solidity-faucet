const { expect } = require('chai');

describe('CTKN contract', () => {
  let CtknToken, ctknToken;
  let user;

  beforeEach(async () => {
    CtknToken = await ethers.getContractFactory('CTKN');
    ctknToken = await CtknToken.deploy();
    [user] = await ethers.getSigners();
  });

  describe('Deployment', () => {
    it('should successfully deploy contracts', async () => {
      const address = await ctknToken.address;

      expect(address).not.to.equal('');
      expect(address).not.to.equal(undefined);
      expect(address).not.to.equal(null);
      expect(address).not.to.equal(0x0);
    });
  });

  describe('Mint', () => {
    it('should be able to mint', async () => {
      const balance = await ctknToken.balanceOf(user.address);
      await ctknToken.mint(user.address, 100);
      const newBalance = await ctknToken.balanceOf(user.address);
      expect(newBalance).to.eq(balance + 100);
    });
  });
});
