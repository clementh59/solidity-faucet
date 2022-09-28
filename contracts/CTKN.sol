// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract CTKN is ERC20 {
  constructor() ERC20('Clement Token', 'CTKN') {}

  /**
   * @dev Creates `amount` new tokens for `to`. Everyone can call the function.
   *
   * See {ERC20-_mint}.
   *
   */
  function mint(address to, uint256 amount) public virtual {
    _mint(to, amount);
  }
}
