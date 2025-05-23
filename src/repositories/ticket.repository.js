import { ticketDao } from '../dao/factory.js';
import { TicketDTO } from '../dto/ticket.dto.js';

export class TicketRepository {
  async getAll() {
    const tickets = await ticketDao.getAll();
    return tickets.map(ticket => new TicketDTO(ticket));
  }

  async getById(id) {
    const ticket = await ticketDao.getById(id);
    return ticket ? new TicketDTO(ticket) : null;
  }

  async getByCode(code) {
    const ticket = await ticketDao.getByCode(code);
    return ticket ? new TicketDTO(ticket) : null;
  }

  async getByPurchaser(email) {
    const tickets = await ticketDao.getByPurchaser(email);
    return tickets.map(ticket => new TicketDTO(ticket));
  }

  async create(ticketData) {
    const createdTicket = await ticketDao.create(ticketData);
    return new TicketDTO(createdTicket);
  }

  async update(id, ticketData) {
    const updatedTicket = await ticketDao.update(id, ticketData);
    return updatedTicket ? new TicketDTO(updatedTicket) : null;
  }

  async delete(id) {
    const deletedTicket = await ticketDao.delete(id);
    return deletedTicket ? new TicketDTO(deletedTicket) : null;
  }
}