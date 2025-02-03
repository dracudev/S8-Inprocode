import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CustomDialogProps {
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isLoginDialogOpen,
  setIsLoginDialogOpen,
}) => {
  return (
    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
      <DialogTrigger asChild>
        <Button className="px-8 py-3 text-base bg-zinc-900 hover:bg-zinc-700 transition-colors">
          Get Started <ArrowRight></ArrowRight>
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Login to Regame</DialogTitle>
        </DialogHeader>
        {/* TODO: Login Form */}
        <p>Login form placeholder</p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
