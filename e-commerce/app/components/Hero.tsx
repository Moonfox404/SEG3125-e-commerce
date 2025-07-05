import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-[35vw] h-120 bg-primary-content flex justify-center max-w-screen">
      <div className="relative w-full sm:px-20 md:px-30 h-full">
        <div className="relative h-full w-full md:max-w-[40rem] flex flex-col justify-center items-center md:items-start">
          <div className="bg-secondary text-secondary-content w-fit text-6xl sm:text-8xl my-1 p-2">Grow your</div>
          <div className="bg-secondary text-secondary-content w-fit text-6xl sm:text-8xl my-1 p-2">home.</div>
          <div className="max-w-[80%] md:max-w-[90%] text-center md:text-left">
            <p className="text-primary text-2xl my-6">Find furniture essentials at affordable prices</p>
          </div>
          <Link href="#categories" className="btn btn-primary btn-xl w-fit">Start Exploring &#8250;</Link>
        </div>
        <div className="absolute right-10 bottom-10 xl:right-20 flex max-[77rem]:hidden items-end h-[95%] w-[60vw]">
          <Image
            src="/furniture-items.PNG"
            alt="Living room with couch and plants"
            fill
            className="object-bottom-right object-contain scale-x-[1] h-auto w-auto max-h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
