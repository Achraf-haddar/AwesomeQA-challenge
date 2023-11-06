export function parseTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // Adding 1 to get correct month (January is 0)
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function sortByTimestampASC(objects: any[]): any[] {
  return objects.slice().sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });
}

export function sortByTimestampDESC(objects: any[]): any[] {
  return objects.slice().sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

export type TicketType = {
  id: string;
  msg_id: string;
  status: string;
  resolved_by: string;
  ts_last_status_change: string;
  timestamp: string;
  context_messages: string[]; // Array of strings
};

export type AuthorType = {
  id: string;
  name: string;
  nickname: string;
  color: string;
  discriminator: string;
  avatar_url: string;
  is_bot: boolean;
  timestamp_insert: string;
};

export type MessageType = {
  id: string;
  channel_id: string;
  parent_channel_id: string;
  community_server_id: string;
  timestamp: string;
  has_attachment: boolean;
  reference_msg_id: string;
  timestamp_insert: string;
  discussion_id: string;
  author_id: string;
  content: string;
  msg_url: string;
  author: AuthorType;
};
