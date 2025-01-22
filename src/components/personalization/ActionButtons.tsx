import { Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Canvas } from "fabric";

interface ActionButtonsProps {
  canvas: Canvas | null;
}

const ActionButtons = ({ canvas }: ActionButtonsProps) => {
  const handleDownload = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2
    });

    const link = document.createElement("a");
    link.download = "design.png";
    link.href = dataURL;
    link.click();
    toast.success("Design téléchargé !");
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="default" 
        className="w-full"
        onClick={handleDownload}
      >
        <Download className="h-4 w-4 mr-2" />
        Télécharger le Design
      </Button>
      <Button 
        variant="outline" 
        className="w-full"
      >
        <Save className="h-4 w-4 mr-2" />
        Sauvegarder le Projet
      </Button>
    </div>
  );
};

export default ActionButtons;