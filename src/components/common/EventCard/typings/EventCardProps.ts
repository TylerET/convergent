export type EventCardProps = {
  eventId: number;
  title: string;
  hostedBy: string;
  date: string;
  time?: string;
  attendees?: number;
  admission?: string;
  image?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  location?: string;
  tags?: string[];
  startTime?: string;
  endTime?: string;
};
