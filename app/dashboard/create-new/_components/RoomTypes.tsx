import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

const roomTypes = [
  {
    id: 1,
    title: "Living Room",
  },
  {
    id: 2,
    title: "Bedroom",
  },
  {
    id: 3,
    title: "Kitchen",
  },
  {
    id: 4,
    title: "Office",
  },
  {
    id: 5,
    title: "Bathroom",
  },
];

type Props = {
  selectedRoomType: (value: string) => void;
};
const RoomTypes: FC<Props> = ({ selectedRoomType }) => {
  return (
    <div>
      <label className="text-slate-400">Select Room Type *</label>
      <Select onValueChange={selectedRoomType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent>
          {roomTypes.map((type) => (
            <SelectItem key={type.id} value={type.title}>
              {type.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoomTypes;
