import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import React, { FC } from "react";

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
  error?: string;
  defaultRoomType: string;
};
const RoomTypes: FC<Props> = ({ selectedRoomType, error, defaultRoomType }) => {
  return (
    <div>
      <label className="text-slate-400 mb-2 block">Select Room Type *</label>
      <Select value={defaultRoomType} onValueChange={selectedRoomType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Room Type" />
        </SelectTrigger>
        <SelectContent defaultValue={defaultRoomType}>
          {roomTypes.map((type) => (
            <SelectItem key={type.id} value={type.title}>
              {type.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default React.memo(RoomTypes);
