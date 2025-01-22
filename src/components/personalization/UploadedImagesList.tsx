import { X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Canvas } from "fabric";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

interface UploadedImagesListProps {
  images: UploadedImage[];
  onImageClick: (image: UploadedImage) => void;
  onOpacityChange: (image: UploadedImage, opacity: number) => void;
  onDeleteImage: (image: UploadedImage) => void;
  canvas: Canvas | null;
}

const UploadedImagesList = ({ 
  images, 
  onImageClick, 
  onOpacityChange,
  onDeleteImage,
  canvas 
}: UploadedImagesListProps) => {
  const handleDelete = (image: UploadedImage, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canvas) return;

    const fabricObject = canvas.getObjects().find(obj => {
      return obj.type === 'image' && (obj as any)._element?.src === image.url;
    });

    if (fabricObject) {
      canvas.remove(fabricObject);
      canvas.renderAll();
    }

    onDeleteImage(image);
    toast.success("Image supprimée !");
  };

  return (
    <ScrollArea className="h-[300px] lg:h-[600px] pr-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img) => (
          <div 
            key={img.id}
            className="space-y-2"
          >
            <div 
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img.url} 
                alt={img.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button 
                  size="icon" 
                  variant="destructive"
                  onClick={(e) => handleDelete(img, e)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Opacité</Label>
              <Slider
                defaultValue={[100]}
                max={100}
                step={1}
                onValueChange={(value) => onOpacityChange(img, value[0] / 100)}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default UploadedImagesList;