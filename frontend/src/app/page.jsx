import Search from "@components/Search";
import BackgroundBlur from "@/components/BackgroundBlur";
import { Button } from "@/components/ui/Button";
import Background from "@/components/BackgroundImage";
import homeBackground from "@public/home-background.svg";
import TagList from "@/components/TagList";
import Link from "next/link";
import { auth } from "@/auth";
import { getTranslations } from "@/lib/i18n/getTranslations";

export default async function Home({ params }) {
  const session = await auth();
  // Detect locale from params, cookies, or headers
  let locale = "en";
  if (params?.locale) locale = params.locale;
  else if (typeof navigator !== "undefined")
    locale = navigator.language.split("-")[0];
  // You can add cookie/header detection here if needed

  const t = getTranslations(locale);

  const homeTags = [
    t.home.tags.popular,
    t.home.tags.explore,
    t.home.tags.topRated,
  ];

  return (
    <>
      <Background image={homeBackground} />
      <div className="grid grid-cols-5 w-full page-wrapper">
        <div className="flex flex-col w-full h-full col-start-2 col-span-3 flex-none items-center justify-around">
          <main className="flex flex-col gap-17 items-center justify-start text-center sm:items-start">
            <div
              id="hero"
              className="flex flex-col gap-6 items-center justify-center"
            >
              <h1 className="text-6xl font-bold w-fit whitespace-pre-line">
                {t.home.hero.title}

              </h1>
              <p className="w-full text-2xl">{t.home.hero.subtitle}</p>
              <p className="text-lg text-muted-foreground">
                {t.home.hero.description}
              </p>
            </div>
            <p className="w-full text-2xl font-semibold capitalize">
              {t.home.search.title}
            </p>

            <div className="flex w-full justify-center">
              <BackgroundBlur className="w-1/2">
                <Search
                  placeholder={t.home.search.placeholder}
                  className="w-full rounded-none border border-ring focus-visible:border-neutral-300 py-7 px-2"
                />
              </BackgroundBlur>
            </div>
          </main>
          <footer className="row-start-3 flex flex-wrap items-center justify-center">
            <Link href="/courses">
              <TagList tags={homeTags} />
            </Link>
          </footer>
        </div>

        {!session?.user && (
          <aside className="flex flex-col gap-8 items-end text-start justify-center">
            <h1 className="text-5xl font-light text-end whitespace-pre-line">
              {t("home.teach.title")}
            </h1>
            <Link href="/auth">
              <Button className="dark:bg-black rounded-none">
                {t("home.teach.cta")}
              </Button>
            </Link>
          </aside>
        )}
      </div>
    </>
  );
}
