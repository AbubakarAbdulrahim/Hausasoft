export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  category: string;
  level: string;
  duration: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}