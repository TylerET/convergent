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
  description?: string;
  location?: string;
  tags?: string[];
  startTime?: string;
  endTime?: string;
};
