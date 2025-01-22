import { Type, Palette, ArrowUp, ArrowDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fabric } from "fabric";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DesignToolsProps {
  text: string;
  setText: (text: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  activeText: fabric.Text | null;
  canvas: fabric.Canvas | null;
  fonts: Array<{ name: string; value: string }>;
}

const DesignTools = ({
  text,
  setText,
  selectedFont,
  setSelectedFont,
  textColor,
  setTextColor,
  activeText,
  canvas,
  fonts,
}: DesignToolsProps) => {
  const updateTextStyle = (property: string, value: any) => {
    if (!canvas || !activeText) return;
    
    activeText.set(property, value);
    canvas.renderAll();
    toast.success(`Style mis à jour !`);
  };

  const handleFontChange = (value: string) => {
    setSelectedFont(value);
    updateTextStyle('fontFamily', value);
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    updateTextStyle('fill', color);
  };

  const adjustTextSize = (increase: boolean) => {
    if (!canvas || !activeText) return;
    const currentSize = activeText.fontSize || 16;
    const newSize = increase ? currentSize + 2 : currentSize - 2;
    if (newSize >= 8 && newSize <= 72) {
      updateTextStyle('fontSize', newSize);
    }
  };

  const handleTextInput = (value: string) => {
    setText(value);
    if (activeText) {
      updateTextStyle('text', value);
    }
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Texte</Label>
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => handleTextInput(e.target.value)}
            placeholder={text ? undefined : "Tapez votre texte..."}
            className="flex-1 h-9 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Police</Label>
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Choisir une police" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                  className="text-sm"
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Couleur</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={textColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-9 p-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Style du Texte</Label>
        <div className="flex gap-2">
          <ToggleGroup type="multiple" className="justify-start bg-gray-50 p-1 rounded-md">
            <ToggleGroupItem 
              value="bold" 
              aria-label="Toggle bold"
              onClick={() => updateTextStyle('fontWeight', activeText?.fontWeight === 'bold' ? 'normal' : 'bold')}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="italic" 
              aria-label="Toggle italic"
              onClick={() => updateTextStyle('fontStyle', activeText?.fontStyle === 'italic' ? 'normal' : 'italic')}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="underline" 
              aria-label="Toggle underline"
              onClick={() => updateTextStyle('underline', !activeText?.underline)}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup type="single" className="justify-start bg-gray-50 p-1 rounded-md">
            <ToggleGroupItem 
              value="left" 
              aria-label="Align left"
              onClick={() => updateTextStyle('textAlign', 'left')}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="center" 
              aria-label="Align center"
              onClick={() => updateTextStyle('textAlign', 'center')}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="right" 
              aria-label="Align right"
              onClick={() => updateTextStyle('textAlign', 'right')}
              className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:text-primary"
            >
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Taille du Texte</Label>
        <div className="flex gap-2">
          <Button 
            onClick={() => adjustTextSize(false)} 
            size="icon" 
            variant="outline"
            className="h-8 w-8"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => adjustTextSize(true)} 
            size="icon" 
            variant="outline"
            className="h-8 w-8"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignTools;