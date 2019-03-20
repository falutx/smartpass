
pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Erc721Pass is ERC721Full, Ownable {

    struct passToken {
        uint256 tokenId;
        uint16 seatId;
        uint8 statusId; //1-valid, 2-invalid, so far
        string tokenUri;
    }

    string private constant tokenName = "ABONO_CLUB";
    string private constant tokenSymbol = "ABC";

    passToken[] private tokens;
          
    constructor () public
        ERC721Full(tokenName, tokenSymbol)
    {
    }

    /**
    * Custom accessor to create a pass token
    */
    function createPassTokenTo (
        address _to,
        uint16 _seatId,
        string  memory _tokenURI
    ) public onlyOwner returns (uint256)
    {   
        uint256 tokenId = totalSupply() + 1;
        _mint(_to, tokenId);
        passToken memory bono = passToken(tokenId, _seatId, 1, _tokenURI);
        tokens.push(bono);
        return tokenId;       
    }
}
