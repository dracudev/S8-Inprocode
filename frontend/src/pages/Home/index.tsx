import CustomDialog from "@/components/ui/custom-dialog";
import { useState } from "react";

import CustomCarousel from "@/components/ui/custom-carousel";

import FeatureCard from "@/components/ui/feature-card";
import { RecycleIcon, GamepadIcon, HandshakeIcon } from "lucide-react";

const Home = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
    <div className="container">
      <div className="container mx-auto  px-8 py-8 space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary tracking-tight">
            Reduce, Reuse, Regame!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Swap, trade, and give new life to old games. Save money, reduce
            waste, and discover your next adventure!
          </p>
        </header>

        <CustomCarousel className="w-full" />

        <section className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            title="Game Exchange"
            description="Trade games with other gamers and expand your collection affordably."
          >
            {" "}
            <GamepadIcon></GamepadIcon>
          </FeatureCard>
          <FeatureCard
            title="Community Driven"
            description="Connect with like-minded gamers who care about sustainability."
          >
            {" "}
            <HandshakeIcon></HandshakeIcon>
          </FeatureCard>
          <FeatureCard
            title="Eco-Friendly"
            description="Reduce electronic waste and promote a circular economy for games."
          >
            {" "}
            <RecycleIcon></RecycleIcon>
          </FeatureCard>
        </section>

        <footer className="text-center space-y-4">
          <CustomDialog
            isLoginDialogOpen={isLoginDialogOpen}
            setIsLoginDialogOpen={setIsLoginDialogOpen}
          />
          <p className="text-sm text-muted-foreground">
            New to Regame? Create an account and start trading!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
