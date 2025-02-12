import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import banner1 from "@/assets/banner1.webp";
import banner2 from "@/assets/banner2.webp";
import banner3 from "@/assets/banner3.webp";
import Autoplay from "embla-carousel-autoplay";

interface CarouselProps {
  className?: string;
}
const HomePageImages: string[] = [banner1, banner2, banner3];

const CustomCarousel: React.FC<CarouselProps> = ({ className }) => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className={`w-full ${className}`}
    >
      <CarouselContent>
        {HomePageImages.map((src, index) => (
          <CarouselItem key={index}>
            <img
              src={src}
              alt={`Game trading slide ${index + 1}`}
              className="h-[250px] w-full object-cover rounded-xl"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CustomCarousel;
