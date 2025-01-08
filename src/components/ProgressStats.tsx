import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ProgressStats = () => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Streak</span>
            <span className="text-primary font-medium">7 days</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Lessons Completed</span>
            <span className="text-primary font-medium">12/20</span>
          </div>
          <Progress value={60} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Vocabulary Mastered</span>
            <span className="text-primary font-medium">85 words</span>
          </div>
          <Progress value={40} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};