import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Card } from "@/components/ui/card";
import { Image, Move, Palette } from "lucide-react";
import DesignTools from "@/components/personalization/DesignTools";
import ImageUploader from "@/components/personalization/ImageUploader";
import UploadedImagesList from "@/components/personalization/UploadedImagesList";
import ActionButtons from "@/components/personalization/ActionButtons";

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
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState([16]);
  const [textColor, setTextColor] = useState("#000000");
  const [selectedFont, setSelectedFont] = useState("Montserrat");
  const [activeText, setActiveText] = useState<fabric.Text | null>(null);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#f8f9fa",
    });

    // Add placeholder text
    const placeholderText = new fabric.Text("Tapez votre texte ici...", {
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

    fabricCanvas.set('allowTouchScrolling', true);
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!canvas) return;

    // Clear existing text objects
    const existingTexts = canvas.getObjects().filter(obj => obj instanceof fabric.Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      // If there's user input, add the actual text
      const fabricText = new fabric.Text(text, {
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
      const placeholderText = new fabric.Text("Tapez votre texte ici...", {
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

  useEffect(() => {
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font.value.replace(' ', '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Personnalisation</h1>
          <p className="text-gray-600">Créez votre design unique en quelques clics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6 space-y-6">
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
                    onImageUpload={(image) => setUploadedImages(prev => [...prev, image])}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Move className="h-5 w-5" />
                Actions
              </h2>
              <ActionButtons canvas={canvas} />
            </Card>
          </div>

          <div className="lg:col-span-6">
            <Card className="p-6">
              <div className="aspect-[5/6] w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="max-w-full shadow-lg touch-manipulation" />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <Image className="h-5 w-5" />
                Images Téléchargées
              </h2>
              <UploadedImagesList images={uploadedImages} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
