import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface HistoryProps {
  user: any;
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const historyItems = [
    { date: '2024-01-20', action: 'Video uploaded', details: 'Introduction.mp4' },
    { date: '2024-01-19', action: 'Client added', details: 'John Doe' },
    { date: '2024-01-18', action: 'Settings updated', details: 'Profile changes' },
  ];

  return (
    <div className="p-6 mt-16">
      <Card className="p-6 bg-dashboard-card">
        <h2 className="text-2xl font-bold mb-6">Activity History</h2>
        
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{item.action}</p>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
              <span className="ml-auto text-sm text-muted-foreground">{item.date}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default History;