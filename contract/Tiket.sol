// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);
    
    function approve(address, uint256) external returns (bool);
    
    function transferFrom(address, address, uint256) external returns (bool);
    
    function totalSupply() external view returns (uint256);
    
    function balanceOf(address) external view returns (uint256);
    
    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Tiket {
    uint256 internal ticketsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    modifier onlyTicketOwner(uint _index) {
        Ticket storage ticket = tickets[_index];
        require(
            msg.sender == ticket.owner,
            "only the owner of this ticket can call this function"
        );
        _;
    }

    /**
     * @title A single ticket object
     */
    struct Ticket {
        address payable owner;
        string name;
        string date;
        string venue;
        string time;
        string details;
        string image;
        uint256 createdAt;
        uint price;
        uint totalAvailable;
        uint ticketsSold;
    }

    mapping(uint => Ticket) internal tickets;

    function getTicketsLength() public view returns (uint256) {
        return (ticketsLength);
    }

    function validateData(
        string memory _name,
        string memory _venue,
        string memory _details,
        string memory _image,
        uint _price
    ) internal pure {
        require(bytes(_name).length > 1, "Please enter a valid ticket name");
        require(bytes(_venue).length > 1, "Please enter a valid ticket name");
        require(bytes(_details).length > 1, "Please enter a valid ticket name");
        require(bytes(_image).length > 1, "Please enter a valid ticket name");
        require(_price > 0, "Please enter a valid ticket name");
    }

    // function called when we create a ticket for an event
    function createTicket(
        string memory _name,
        string memory _date,
        string memory _venue,
        string memory _time,
        string memory _details,
        string memory _image,
        uint _price,
        uint _totalAvailable
    ) public {
        // ensure correct data being passed
        validateData(_name, _venue, _details, _image, _price);
        uint _ticketsSold = 0;
        uint256 _createdAt = block.timestamp;
        tickets[ticketsLength] = Ticket(
            payable(msg.sender),
            _name,
            _date,
            _venue,
            _time,
            _details,
            _image,
            _createdAt,
            _price,
            _totalAvailable,
            _ticketsSold
        );
        ticketsLength++;
    }

    // function called when we create a ticket for an event
    function editTicket(
        uint _index,
        string memory _name,
        string memory _date,
        string memory _venue,
        string memory _time,
        string memory _details,
        string memory _image,
        uint _price,
        uint _totalAvailable
    ) public onlyTicketOwner(_index) {
        // ensure correct data being passed
        validateData(_name, _venue, _details, _image, _price);
        Ticket storage ticket = tickets[_index];
        uint _ticketsSold = ticket.ticketsSold;
        uint256 _createdAt = ticket.createdAt;
        ticket.name = _name;
        ticket.date = _date;
        ticket.venue = _venue;
        ticket.time = _time;
        ticket.details = _details;
        ticket.image = _image;
        ticket.createdAt = _createdAt;
        ticket.price = _price;
        ticket.totalAvailable = _totalAvailable;
        ticket.ticketsSold = _ticketsSold;
    }

    /**
     * @dev function called when getting a single ticket information
     * @return Ticket object
     */
    function getTicket(uint _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint,
            uint,
            uint
        )
    {
        Ticket storage ticket = tickets[_index];
        return (
            ticket.owner,
            ticket.name,
            ticket.date,
            ticket.venue,
            ticket.time,
            ticket.details,
            ticket.image,
            ticket.createdAt,
            ticket.price,
            ticket.totalAvailable,
            ticket.ticketsSold
        );
    }

    /**
     * @dev function called when we buy a ticket
     */
    function buyTicket(string memory _id, uint _index) public payable {
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                tickets[_index].owner,
                tickets[_index].price
            ),
            "Transfer failed"
        );
        // update sold ticket
        tickets[_index].ticketsSold++;
        tickets[_index].totalAvailable--;
        
        _createPurchasedTicket(_id, msg.sender);
    }

    /**
     * @title A ticket item represents swag, merch or any promotional items
     */
    struct TicketItem {
        address payable owner;
        string ticketId;
        string name;
        string image;
        uint price;
        uint totalItemsAvailable;
        uint itemsSold;
    }

    // Maps ticket to its ticketItems
    mapping(string => TicketItem[]) public ticketItems;

    /**
     * @notice Returns the number of ticketItems associated to a ticket
     * @param _id The id of Ticket
     */
    function getTicketsItemsLength(string memory _id)
        public
        view
        returns (uint)
    {
        return ticketItems[_id].length;
    }

    /**
     * @notice Returns the TicketItem at index in the ownership array
     * @dev function called to create a ticket item
     */
    function createTicketItem(
        string memory _ticketId,
        string memory _name,
        string memory _image,
        uint _price,
        uint _totalItemsAvailable
    ) public {
        uint _itemsSold = 0;

        TicketItem memory item = TicketItem(
            payable(msg.sender),
            _ticketId,
            _name,
            _image,
            _price,
            _totalItemsAvailable,
            _itemsSold
        );

        ticketItems[_ticketId].push(item);
    }

    /**
     * @dev function called to get a ticket item
     */
    function getTicketItem(string memory _ticket, uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint,
            uint,
            uint
        )
    {
        require(_index >= 0);
        require(
            ticketItems[_ticket].length > 0,
            "This ticket has no items available for sale!"
        );

        TicketItem storage item = ticketItems[_ticket][_index];

        return (
            item.owner,
            item.ticketId,
            item.name,
            item.image,
            item.price,
            item.totalItemsAvailable,
            item.itemsSold
        );
    }

    /**
     * @dev function called when we buy a ticket
     */
    function buyTicketItem(string memory _ticket, uint _index)
        public
        payable
    {
        TicketItem storage item = ticketItems[_ticket][_index];

        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                item.owner,
                item.price
            ),
            "Transfer failed"
        );
        // update sold ticket item
        item.itemsSold++;
        item.totalItemsAvailable--;
        _createPurchasedTicketItem(_ticket, msg.sender);
    }

    /**
     * @title A purchased ticket
     */
    struct PurchasedTicket {
        string ticketId;
        uint256 boughtOn;
        bool isValid;
    }

    // Maps purchased tickets to a user
    mapping(address => PurchasedTicket[]) public userTickets;

    /**
     * @notice Returns the number of tickets associated to an address
     * @param _owner The owner address
     * @return The number of tickets bought by a user
     */
    function getUserTicketsLength(address _owner)
        public
        view
        returns (uint)
    {
        return userTickets[_owner].length;
    }

    /**
     * @dev function called after a ticket is bought
     */
    function _createPurchasedTicket(string memory _ticketId, address ticketOwner) private{
         uint256 _boughtOn = block.timestamp;
        bool _isValid = true;

        PurchasedTicket memory item = PurchasedTicket(
            _ticketId,
            _boughtOn,
            _isValid
        );

        userTickets[ticketOwner].push(item);
    }

    /**
     * @dev function called to get a purchased ticket
     */
    function getPurchasedTicket(address _owner, uint _index)
        public
        view
        returns (
            string memory,
            uint256,
            bool
        )
    {
        require(_index >= 0);
        require(
            userTickets[_owner].length > 0,
            "You have no tickets for this address."
        );

        PurchasedTicket storage item = userTickets[_owner][_index];

        return (item.ticketId, item.boughtOn, item.isValid);
    }

    /**
     * @title A purchased ticket item
     */
    struct PurchasedTicketItem {
        string ticketItemId;
        uint256 boughtOn;
    }

    // Maps purchased tickets to a user
    mapping(address => PurchasedTicketItem[]) public userTicketItems;

    /**
     * @notice Returns the number of ticketItems associated to an address
     * @param _owner The owner address
     * @return The number of ticket items bought by a user
     */
    function getUserTicketItemsLength(address _owner)
        public
        view
        returns (uint)
    {
        return userTicketItems[_owner].length;
    }

    /**
     * @dev function called after a ticketItem is bought
     */
    function _createPurchasedTicketItem(string memory _ticketItemId, address ownerOfItem) private {
        uint256 _boughtOn = block.timestamp;

        PurchasedTicketItem memory item = PurchasedTicketItem(
            _ticketItemId,
            _boughtOn
        );

        userTicketItems[ownerOfItem].push(item);
    }

    /**
     * @dev function called to get a purchased ticket item
     */
    function getPurchasedTicketItem(address _owner, uint _index)
        public
        view
        returns (string memory, uint256)
    {
        require(_index >= 0);
        require(
            userTicketItems[_owner].length > 0,
            "You have no ticket items bought for this address."
        );

        PurchasedTicketItem storage item = userTicketItems[_owner][_index];

        return (item.ticketItemId, item.boughtOn);
    }
}
