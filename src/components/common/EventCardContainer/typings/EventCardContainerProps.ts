import { EventCardProps } from "../../EventCard/typings/EventCardProps";

export type EventCardContainerProps = {
  title?: string;
  linkText?: string;
  linkAction?: () => void;
  eventCards: EventCardProps[] | [];
  showLocation?: boolean;
};
