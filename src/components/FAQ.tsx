import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container">
        <h2 className="text-center font-serif text-3xl font-bold">Questions Fréquentes</h2>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Quels sont les délais de livraison ?</AccordionTrigger>
              <AccordionContent>
                Nous livrons en France métropolitaine sous 2-4 jours ouvrés. Pour les commandes internationales, comptez 5-7 jours ouvrés.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Comment puis-je retourner un article ?</AccordionTrigger>
              <AccordionContent>
                Vous disposez de 30 jours pour retourner un article. Il doit être non porté et dans son emballage d'origine. Les frais de retour sont gratuits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Proposez-vous des réductions pour les commandes en gros ?</AccordionTrigger>
              <AccordionContent>
                Oui, nous proposons des tarifs préférentiels pour les commandes professionnelles en grande quantité. Contactez notre service commercial pour plus d'informations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;