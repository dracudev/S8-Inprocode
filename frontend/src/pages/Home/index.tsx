import { Button } from "@/components/ui/button";
import Banner from "../../assets/banner.webp";

const Home = () => {
  return (
    <div className="items-center justify-center flex">
      <div className="flex-col flex m-3 w-[75%]">
        <header className="flex text-xl items-center justify-center m-3">
          <h1 className="text-3xl text-center">Reduce, Reuse, Regame!</h1>
        </header>
        <section className="flex flex-col m-3 items-center">
          <img src={Banner} className="w-[75%] border rounded-2xl mb-3" />
          <p className="text-center">
            A web app for gamers to swap, trade, and give new life to old games.
            Save money, reduce waste, and discover your next adventure while
            supporting a sustainable gaming community!
          </p>
        </section>
        <footer className="flex items-center justify-center m-3">
          <div className="flex-col flex items-center ">
            {" "}
            <Button className=" bg-slate-100 text-zinc-800 mb-3">Log In</Button>
            <p className="text-sm">Dont have an account? Create one now!</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
