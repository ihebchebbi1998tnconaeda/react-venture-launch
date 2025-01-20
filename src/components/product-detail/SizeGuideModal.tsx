import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] md:max-w-2xl md:h-[80vh] overflow-hidden bg-white">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4 text-[#700100]" />
          <span className="sr-only">Close</span>
        </button>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#700100]">Guide des tailles</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100%-80px)] pr-4">
          <div className="space-y-6 p-1">
            <div className="text-sm text-gray-600 space-y-4">
              <p>
                Les mensurations indiquées dans le tableau sont prises sur le corps et non sur le vêtement. 
                Suivez les indications ci-dessous pour prendre vos mesures correctement.
              </p>
              <p>
                Un drop de 7 est appliqué sur nos costumes. Le drop est la différence entre la taille de la veste 
                et celle du pantalon : pour une veste en taille 48, le pantalon sera en taille 41. Si votre morphologie 
                est équilibrée, ce type de costume est adapté. Sinon, nous vous recommandons nos costumes séparables.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Mensurations costume complet, veste de costume et smoking</h3>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-900">Standard</TableHead>
                      <TableHead className="text-gray-900">Taille</TableHead>
                      <TableHead className="text-gray-900">Tour de poitrine en cm</TableHead>
                      <TableHead className="text-gray-900">Tour de taille en cm</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { standard: "S", taille: "44", poitrine: "98-101", taille_cm: "86-89" },
                      { standard: "S/M", taille: "46", poitrine: "102-105", taille_cm: "90-93" },
                      { standard: "M", taille: "48", poitrine: "106-109", taille_cm: "94-97" },
                      { standard: "M/L", taille: "50", poitrine: "110-113", taille_cm: "98-101" },
                      { standard: "L", taille: "52", poitrine: "114-117", taille_cm: "102-105" },
                      { standard: "L/XL", taille: "54", poitrine: "118-121", taille_cm: "106-109" },
                      { standard: "XL", taille: "56", poitrine: "122-125", taille_cm: "110-113" },
                      { standard: "XL/XXL", taille: "58", poitrine: "126-129", taille_cm: "114-117" },
                      { standard: "XXL", taille: "60", poitrine: "130-133", taille_cm: "118-121" },
                      { standard: "XXL/3XL", taille: "62", poitrine: "134", taille_cm: "122" },
                    ].map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-gray-900">{row.standard}</TableCell>
                        <TableCell className="text-gray-900">{row.taille}</TableCell>
                        <TableCell className="text-gray-900">{row.poitrine}</TableCell>
                        <TableCell className="text-gray-900">{row.taille_cm}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-gray-900">Tour de poitrine</h4>
                <p className="text-sm text-gray-600">
                  Tenez-vous droit, mesurez le tour de votre torse, sous les pectoraux. 
                  Il faut que le mètre soit horizontal, ni trop lâche ni trop tendu.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-gray-900">Tour de taille</h4>
                <p className="text-sm text-gray-600">
                  Mesurez le creux naturel de la taille, situé entre la dernière côte et le nombril. 
                  Maintenez le mètre horizontal, ni trop lâche ni trop tendu.
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Pour plus de conseils, vous pouvez contacter notre service client à l'adresse{" "}
                  <a href="mailto:contact@fioriforyou.com" className="text-[#700100] hover:underline">
                    contact@fioriforyou.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;