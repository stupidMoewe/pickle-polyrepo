import { Publisher, Subjects, TicketUpdatedEvent } from "@stupidpickle/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
