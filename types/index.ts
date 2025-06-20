export type User = {
  name: string;
  email: string;
  credit: number;
  imageUrl: string;
  createdAt: string;
};

export type RoomType = {
  roomType: string;
  designType: string;
  userEmail: string;
  originalImage: string;
  aiImage: string;
  id: number;
};
