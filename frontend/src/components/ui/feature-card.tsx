import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  children,
  title,
  description,
}) => (
  <Card className="w-full border-none shadow-xl p-4 bg-zinc-900 text-white">
    <CardContent className="flex flex-col items-center text-center space-y-3">
      <div>{children}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
