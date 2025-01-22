import { useEffect, useRef, useState } from "react";
import { Canvas, Text } from "fabric";
import { Card } from "@/components/ui/card";
import { Image, Move, Palette } from "lucide-react";
import DesignTools from "@/components/personalization/DesignTools";
import ImageUploader from "@/components/personalization/ImageUploader";
import UploadedImagesList from "@/components/personalization/UploadedImagesList";
import ActionButtons from "@/components/personalization/ActionButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

const fonts = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Oswald", value: "Oswald" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Poppins", value: "Poppins" },
];

const Personalization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState([16]);
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const isMobile = useIsMobile();

  const handleDeleteImage = (imageToDelete: UploadedImage) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageToDelete.id));
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWidth = isMobile ? window.innerWidth - 32 : 500;
    const canvasHeight = isMobile ? window.innerHeight * 0.5 : 600;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f8f9fa",
      preserveObjectStacking: true,
    });

    // Add placeholder text
    const placeholderText = new Text("Tapez votre texte ici...", {
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! / 2,
      fontSize: 20,
      fill: "#999999",
      fontFamily: selectedFont,
      originX: 'center',
      originY: 'center',
      selectable: false,
      opacity: 0.7
    });

    fabricCanvas.add(placeholderText);
    fabricCanvas.renderAll();

    fabricCanvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj instanceof Text) {
        setActiveText(obj);
      }
    });

    fabricCanvas.on('selection:created', (e) => {
      const obj = e.selected?.[0];
      if (obj instanceof Text) {
        setActiveText(obj);
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      setActiveText(null);
    });

    setCanvas(fabricCanvas);

    const handleResize = () => {
      const newWidth = isMobile ? window.innerWidth - 32 : 500;
      const newHeight = isMobile ? window.innerHeight * 0.5 : 600;
      fabricCanvas.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!canvas) return;

    // Clear existing text objects
    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      // If there's user input, add the actual text
      const fabricText = new Text(text, {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: fontSize[0],
        fill: textColor,
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
      });

      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
      setActiveText(fabricText);
    } else {
      // If no text, show placeholder
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });
      canvas.add(placeholderText);
    }

    canvas.renderAll();
  }, [text, canvas]);

  return (
    <div className="container mx-auto py-6 px-4 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            <Card className="p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5" />
                  Outils de Design
                </h2>
                
                <DesignTools
                  text={text}
                  setText={setText}
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                  textColor={textColor}
                  setTextColor={setTextColor}
                  activeText={activeText}
                  canvas={canvas}
                  fonts={fonts}
                />

                <div className="mt-6">
                  <ImageUploader
                    canvas={canvas}
                    onImageUpload={(image) => {
                      setUploadedImages(prev => [...prev, image]);
                      toast.success("Image ajoutée avec succès !");
                    }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-4 lg:p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Move className="h-5 w-5" />
                Actions
              </h2>
              <ActionButtons canvas={canvas} />
            </Card>
          </div>

          <div className="lg:col-span-6 order-first lg:order-none">
            <Card className="p-4 lg:p-6">
              <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full touch-manipulation shadow-lg"
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-4 lg:p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Image className="h-5 w-5" />
                Images Téléchargées
              </h2>
              <UploadedImagesList 
                images={uploadedImages}
                canvas={canvas}
                onImageClick={(image) => {
                  if (!canvas) return;
                  const obj = canvas.getObjects().find(
                    obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                  );
                  if (obj) {
                    canvas.setActiveObject(obj);
                    canvas.renderAll();
                  }
                }}
                onOpacityChange={(image, opacity) => {
                  if (!canvas) return;
                  const obj = canvas.getObjects().find(
                    obj => obj.type === 'image' && (obj as any)._element?.src === image.url
                  );
                  if (obj) {
                    obj.set('opacity', opacity);
                    canvas.renderAll();
                  }
                }}
                onDeleteImage={handleDeleteImage}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
