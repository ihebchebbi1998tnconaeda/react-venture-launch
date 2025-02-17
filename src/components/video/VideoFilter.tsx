import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';

interface Season {
  id_saison: string;
  name_saison: string;
}

interface VideoFilterProps {
  searchTerm: string;
  selectedSeason: string;
  onSearchChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  seasons: Season[];
}

const VideoFilter: React.FC<VideoFilterProps> = ({
  searchTerm,
  selectedSeason,
  onSearchChange,
  onSeasonChange,
  seasons
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="البحث عن فيديو..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <Select value={selectedSeason} onValueChange={onSeasonChange}>
        <SelectTrigger className="w-[200px] text-black">
          <SelectValue placeholder="تصفية حسب الموسم" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-black">جميع المواسم</SelectItem>
          {seasons.map((season) => (
            <SelectItem key={season.id_saison} value={season.id_saison.toString()} className="text-black">
              {season.name_saison}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default VideoFilter;