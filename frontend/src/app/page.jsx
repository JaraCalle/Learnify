import Search from "@components/Search";
import BackgroundBlur from "@/components/BackgroundBlur";
import { Button } from "@/components/ui/Button";
import Background from "@/components/BackgroundImage";
import homeBackground from "@public/home-background.svg";
import TagList from "@/components/TagList";

export default function Home() {

  const homeTags = ["Popular", "Explore", "Top-rated"];

  return (
    <>
      <Background image={homeBackground} />
      <div className="grid grid-cols-5 w-full page-wrapper ">
        <div className="flex flex-col w-full h-full col-start-2 col-span-3  flex-none items-center justify-around">
          <main className="flex flex-col gap-17 items-center justify-start text-center sm:items-start">
            <div
              id="hero"
              className="flex flex-col gap-6 items-center justify-center"
            >
              <h1 className="text-6xl font-bold w-fit">
                La Escuela De Tecnologia Enfocada En Ti
              </h1>
              <p className="w-full font-thin text-2xl">
                Figma helps design and development <br /> teams build great
                products, <strong>Together.</strong>
              </p>
            </div>
            <p className="w-full text-2xl font-semibold capitalize">
              want to start ?
            </p>

            <div className="flex w-full justify-center">
              <BackgroundBlur className="w-1/2">
                <Search
                  placeholder="python..."
                  className="w-full rounded-none border border-ring focus-visible:border-neutral-300  py-7 px-2"
                />
              </BackgroundBlur>
            </div>
          </main>
          <footer className="row-start-3 flex flex-wrap items-center justify-center">
            <TagList tags={homeTags
            } />
          </footer>
        </div>

        <aside className="flex flex-col  gap-8 items-end text-start justify-center">
          <h1 className="text-5xl font-light text-end ">
            Want To <br /> Teach?
          </h1>
          <Button className={"dark:bg-black rounded-none"}>Sign Up</Button>
        </aside>
      </div>
    </>
  );
}
