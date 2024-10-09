export type EventCardProps = {
  eventId: string;
  title: string;
  hostedBy: string;
  date: Date;
  time?: string;
  attendees?: number;
  admission?: string;
  imageSrc?: string;
  imageAlt?: string;
};
