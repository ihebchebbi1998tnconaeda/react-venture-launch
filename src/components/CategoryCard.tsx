import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  lessons: number;
  icon: React.ReactNode;
}

export const CategoryCard = ({ title, description, lessons, icon }: CategoryCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-primary h-10 w-10">
            {icon}
          </div>
          <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
            {lessons} lessons
          </Badge>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button className="w-full group-hover:bg-primary/90">
          Start Learning <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};