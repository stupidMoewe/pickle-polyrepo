import { Publisher, Subjects, TicketCreatedEvent } from "@stupidpickle/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
