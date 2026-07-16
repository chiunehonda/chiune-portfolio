import { useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ExperienceContact } from "@/components/ExperienceContact";
import { PhotoStory, type StoryImage } from "@/components/PhotoStory";
import { ProjectSection } from "@/components/ProjectSection";
import { SiteHeader } from "@/components/SiteHeader";
import { ScrollExpandMedia } from "@/components/ui/scroll-expansion-hero";

const storyFrames: StoryImage[] = [
  {
    src: "/media/story/chiune-alpine-water.webp",
    alt: "Chiune overlooking alpine water from a rocky shoreline",
    label: "Outside",
    position: "center 52%",
  },
  {
    src: "/media/story/city-night.webp",
    alt: "Chiune and friends together in Shibuya at night",
    label: "Travel",
    position: "center 56%",
  },
  {
    src: "/media/story/friends-alpine-summit-story.webp",
    alt: "Chiune and a friend at an alpine summit above a mountain lake",
    label: "The summit",
  },
  {
    src: "/media/story/friends-beach-sunset-story.webp",
    alt: "Chiune and friends together on the beach at sunset",
    label: "The coast",
    position: "12% 50%",
    lighting: "left",
  },
  {
    src: "/media/story/community-forest-group.webp",
    alt: "Chiune and friends together outdoors",
    label: "Community",
    layout: "collage",
    position: "center 44%",
    supportingImages: [
      {
        src: "/media/story/friends-backpacking.webp",
        alt: "Chiune and friends together before a backpacking trip",
        position: "center 61%",
      },
      {
        src: "/media/story/friends-coast.webp",
        alt: "Chiune and friends together at the coast",
        position: "center 58%",
      },
    ],
  },
  {
    src: "/media/story/chiune-technical-night.webp",
    alt: "Chiune holding a technical build during a nighttime event",
    label: "Back to building",
    position: "center 40%",
    layout: "portrait",
  },
];

function App() {
  useEffect(() => {
    const moveToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      window.requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ behavior: "auto", block: "start" });
        window.requestAnimationFrame(() => {
          root.style.scrollBehavior = previousBehavior;
        });
      });
    };

    const initialMove = window.setTimeout(moveToHash, 80);
    window.addEventListener("hashchange", moveToHash);
    return () => {
      window.clearTimeout(initialMove);
      window.removeEventListener("hashchange", moveToHash);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <SiteHeader />
      <main id="top">
        <ScrollExpandMedia
          mediaSrc="/media/story/chiune-summit-hero-desktop.webp"
          mobileMediaSrc="/media/story/chiune-summit-hero-mobile.webp"
          mediaAlt="Chiune at a mountain summit"
        />
        <PhotoStory frames={storyFrames} />
        <ProjectSection />
        <ExperienceContact />
      </main>
    </>
  );
}

export default App;
