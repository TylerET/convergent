import { EventCardProps } from "../../EventCard/typings/EventCardProps";

export type EventCardContainerProps = {
  title?: string;
  location?: string;
  linkText?: string;
  linkAction?: () => void;
  eventCards: EventCardProps[] | [];
};
