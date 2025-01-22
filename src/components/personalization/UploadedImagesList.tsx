import { RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

interface UploadedImagesListProps {
  images: UploadedImage[];
}

const UploadedImagesList = ({ images }: UploadedImagesListProps) => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-2 gap-4">
        {images.map((img) => (
          <div 
            key={img.id}
            className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
          >
            <img 
              src={img.url} 
              alt={img.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="icon" variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UploadedImagesList;