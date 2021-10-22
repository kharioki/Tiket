import BigNumber from 'bignumber.js';
export const ERC20_DECIMALS = 18;

export const getAllTickets = async (contract) => {
  const _ticketsLength = await contract.methods.getTicketsLength().call();
  const _tickets = [];

  for (let i = 0; i < _ticketsLength; i++) {
    let _ticket = new Promise(async (resolve, reject) => {
      const t = await contract.methods.getTicket(i).call();
      resolve({
        index: i,
        owner: t[0],
        name: t[1],
        date: t[2],
        venue: t[3],
        time: t[4],
        details: t[5],
        image: t[6],
        createdAt: t[7],
        price: new BigNumber(t[8]),
        totalAvailable: t[9],
        ticketsSold: t[10],
      });
    });
    _tickets.push(_ticket);
  }
  return await Promise.all(_tickets);
};

export const createNewTicket = async (contract, ticket, kit) => {
  const ticketParams = [
    ticket.name,
    ticket.date,
    ticket.venue,
    ticket.time,
    ticket.details,
    ticket.image,
    ticket.price,
    ticket.totalAvailable,
  ];

  try {
    const res = await contract.methods
      .createTicket(...ticketParams)
      .send({
        from: kit.defaultAccount,
      });
  } catch (err) {
    console.error(err);
  }
}

export const getTicket = async (contract, index) => {
  const _ticket = new Promise(async (resolve, reject) => {
    const t = await contract.methods.getTicket(index).call();
    resolve({
      index: index,
      owner: t[0],
      name: t[1],
      date: t[2],
      venue: t[3],
      time: t[4],
      details: t[5],
      image: t[6],
      createdAt: t[7],
      price: new BigNumber(t[8]),
      totalAvailable: t[9],
      ticketsSold: t[10],
    });
  });
  return await _ticket;
};

export const getTicketItems = async (contract, index) => {
  const _ticketItemsLength = await contract.methods.getTicketsItemsLength(index).call();
  const _ticketItems = [];

  for (let i = 0; i < _ticketItemsLength; i++) {
    let _ticketItem = new Promise(async (resolve, reject) => {
      const t = await contract.methods.getTicketItem(index, i).call();
      resolve({
        index: i,
        owner: t[0],
        ticketId: t[1],
        name: t[2],
        image: t[3],
        price: new BigNumber(t[4]),
        totalItemsAvailable: t[5],
        itemsSold: t[6],
      });
    });
    _ticketItems.push(_ticketItem);
  }
  return await Promise.all(_ticketItems);
}

export const createTicketItem = async (contract, ticketItem, kit, id) => {
  const ticketItemParams = [
    id,
    ticketItem.name,
    ticketItem.image,
    new BigNumber(ticketItem.price).shiftedBy(ERC20_DECIMALS).toString(),
    ticketItem.totalItemsAvailable,
  ];

  try {
    const res = await contract.methods
      .createTicketItem(...ticketItemParams)
      .send({
        from: kit.defaultAccount,
      });
  } catch (err) {
    console.error(err);
  }
}

export const buyTicket = async (contract, index, price, id, kit, approve) => {
  console.log(price, id, index)
  // first approve the contract to spend
  try {
    await approve(price);
  } catch (error) {

    console.error(error);
  }
  // then buy the ticket
  try {
    const result = await contract.methods
      .buyTicket(id, index)
      .send({ from: kit.defaultAccount });

    // console.log('buy result: ', result);
  } catch (error) {
    console.error(error);
  }
}

export const getPurchasedTickets = async (contract, address) => {
  const _purchasedTicketsLength = await contract.methods.getUserTicketsLength(address).call();
  const _purchasedTickets = [];

  for (let i = 0; i < _purchasedTicketsLength; i++) {
    let _purchasedTicket = new Promise(async (resolve, reject) => {
      const t = await contract.methods.getPurchasedTicket(address, i).call();
      resolve({
        index: i,
        ticketId: t[0],
        boughtOn: t[1],
        isValid: t[2]
      });
    });
    _purchasedTickets.push(_purchasedTicket);
  }
  return await Promise.all(_purchasedTickets);
}

export const getPurchasedTicketItems = async (contract, address) => {
  const _purchasedTicketItemsLength = await contract.methods.getUserTicketItemsLength(address).call();
  const _purchasedTicketItems = [];

  for (let i = 0; i < _purchasedTicketItemsLength; i++) {
    let _purchasedTicketItem = new Promise(async (resolve, reject) => {
      const t = await contract.methods.getPurchasedTicketItem(address, i).call();
      resolve({
        index: i,
        ticketItemId: t[0],
        boughtOn: t[1]
      });
    });
    _purchasedTicketItems.push(_purchasedTicketItem);
  }
  return await Promise.all(_purchasedTicketItems);
}

export const buyTicketItem = async (contract, index, price, id, kit, approve) => {
  // first approve the contract to spend
  try {
    await approve(price);
  } catch (error) {
    console.error(error);
  }
  // then buy the ticket
  try {
    const result = await contract.methods
      .buyTicketItem(id, index)
      .send({ from: kit.defaultAccount });
  } catch (error) {
    console.error(error);
  }
}


export const getCartTickets = async (contract, cart) => {
  const cartTickets = [];
  for (let i = 0; i < cart.length; i++) {
    let index = parseInt(cart[i].ticketId);
    let _ticket = await getTicket(contract, index);
    cartTickets.push(_ticket);
  }
  return cartTickets;
}

export const getCartTicketItems = async (contract, cartItems) => {
  const cartTicketItems = [];
  for (let i = 0; i < cartItems.length; i++) {
    let index = parseInt(cartItems[i].ticketItemId);
    let _ticket = cartItems[i].ticketItemId;
    let _ticketItem = await getTicketItem(contract, _ticket, index);
    cartTicketItems.push(_ticketItem);
  }
  return cartTicketItems;
}

const getTicketItem = async (contract, _ticket, index) => {
  const _ticketItem = new Promise(async (resolve, reject) => {
    const t = await contract.methods.getTicketItem(_ticket, index).call();
    resolve({
      index: index,
      owner: t[0],
      ticketId: t[1],
      name: t[2],
      image: t[3],
      price: new BigNumber(t[4]),
      totalItemsAvailable: t[5],
      itemsSold: t[6],
    });
  });
  return await _ticketItem;
}

//TODO: GET PURCHASED TICKET ITEM
// export const getCartTicketItems = async (contract, cartItems) =>  {
//   const cartTicketItems = [];
//   for (let i = 0; i < cartItems.length; i++) {
//     let index = parseInt(cartItems[i].ticketItemId);
//     console.log(index);
//     let _ticket =  await getTicket(contract, index);
//     cartTicketItems.push(_ticket);
//   }
//   return cartTicketItems;
// }


