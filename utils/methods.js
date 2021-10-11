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
    new BigNumber(ticket.price).shiftedBy(ERC20_DECIMALS).toString(),
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

const createPurchasedTicket = async (contract, id, kit) => {
  const params = [
    id,
  ];

  try {
    const res = await contract.methods
      .createPurchasedTicket(...params)
      .send({
        from: kit.defaultAccount,
      });
  } catch (error) {
    console.error(error);
  }
}

export const buyTicket = async (contract, index, price, id, kit, approve) => {
  // first approve the contract to spend
  try {
    await approve(price);
  } catch (error) {
    console.error(error);
  }
  // then buy the ticket
  try {
    const result = await contract.methods
      .buyTicket(index)
      .send({ from: kit.defaultAccount });
  } catch (error) {
    console.error(error);
  }

  // then create the purchased ticket
  try {
    await createPurchasedTicket(contract, id, kit);
  } catch (error) {
    console.error(error);
  }
}
