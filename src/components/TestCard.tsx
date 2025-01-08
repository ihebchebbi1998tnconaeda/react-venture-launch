import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const TestCard = () => {
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const handleClick = () => {
    setCount(prev => prev + 1);
    toast({
      title: "Test successful!",
      description: `Counter increased to ${count + 1}`,
    });
  };

  return (
    <Card className="w-full max-w-md card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Beaker className="h-6 w-6" />
          Test Component
        </CardTitle>
        <CardDescription>
          This is a test card to demonstrate component functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Status: Active</Badge>
          <span className="text-sm text-muted-foreground">Count: {count}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} className="w-full">
          Test Action
        </Button>
      </CardFooter>
    </Card>
  );
};