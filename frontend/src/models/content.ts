export interface EducationItem {
  school: string;
  yearRange: string;
  description: string;
  badges?: string[];
}

export interface SkillItem {
  name: string;
  image: string;
}

export interface MediaItem {
  title: string;
  image: string;
  type: "movie" | "book";
}

export interface HobbyItem {
  key: "movies" | "books" | "blogs";
  title: string;
  icon: string;
  description: string;
}

export interface GoalItem {
  id: string;
  title: string;
  description: string;
  dark?: boolean;
}

export interface AwardItem {
  id: string;
  title: string;
  description: string;
  dark?: boolean;
}

export interface GalleryItem {
  image: string;
  alt: string;
  orientation: "vertical" | "horizontal";
}

export interface AttributionItem {
  label: string;
  text: string;
  linkLabel: string;
  linkUrl: string;
  extra?: {
    label: string;
    url: string;
  };
}

export const aboutText =
  "Hi! I am Elijah Crisehea M. Nollen, you can call me Eli. I am a student passionate about analytics and turning data into actionable insights. I enjoy exploring patterns and solving problems. Computer Science was not my first choice, I initially wanted Industrial Engineering, but because of my scholarship I entered CS and grew to love it more.";

export const educationItems: EducationItem[] = [
  {
    school: "Bernardo College",
    yearRange: "2018 - 2021",
    description:
      "I spent most of my junior high school years here. From 7th to 9th grade, I was a consistent honor student and developed my writing skills through the school publication.",
    badges: ["Honor Student", "Campus Publication"]
  },
  {
    school: "Las Pinas National High School",
    yearRange: "2021 - 2022",
    description:
      "I moved here for my final junior high year, completed Grade 10, and was recognized as an honor student.",
    badges: ["Grade 10 Completion", "Honor Student"]
  },
  {
    school: "Philippine Christian University",
    yearRange: "2022 - 2024",
    description:
      "For senior high I took STEM, earned highest honors, and joined Layag Films Production as one of the talents.",
    badges: ["STEM Track", "Highest Honors", "Layag Films"]
  },
  {
    school: "Asia Pacific College",
    yearRange: "2024 - 2028",
    description:
      "I am currently taking BS Computer Science with focus on cybersecurity and forensics, as an SM Scholar and honor student. I also serve as Director of Operations in JPCS.",
    badges: ["BS Computer Science", "SM Scholar", "JPCS Director of Operations"]
  }
];

export const skillItems: SkillItem[] = [
  { name: "SAP", image: "/img/sap.png" },
  { name: "Power BI", image: "/img/powerbi.png" },
  { name: "SQL", image: "/img/sql.png" },
  { name: "Python", image: "/img/python.png" },
  { name: "CSS", image: "/img/css.png" },
  { name: "HTML", image: "/img/html.png" },
  { name: "Linux", image: "/img/linux.png" },
  { name: "Packet Tracer", image: "/img/cisco-packet-tracer.png" }
];

export const hobbies: HobbyItem[] = [
  {
    key: "movies",
    title: "Movies",
    icon: "/img/movies.png",
    description: "Favorite films and series"
  },
  {
    key: "books",
    title: "Books",
    icon: "/img/books.png",
    description: "Books that I keep returning to"
  },
  {
    key: "blogs",
    title: "Blogs",
    icon: "/img/blogs.png",
    description: "Short reflections and updates"
  }
];

export const mediaItems: MediaItem[] = [
  { title: "Interstellar", image: "/img/interstellar.jpg", type: "movie" },
  { title: "Little Women", image: "/img/little_women.jpeg", type: "movie" },
  { title: "Anne with an E", image: "/img/anne_with_an_e.jpg", type: "movie" },
  { title: "Avatar", image: "/img/avatar.jpg", type: "movie" },
  { title: "Avengers: Infinity War", image: "/img/avengers_infinity_war.jpg", type: "movie" },
  { title: "Pride and Prejudice", image: "/img/pride_and_prejudice.jpg", type: "movie" },
  { title: "The Greatest Showman", image: "/img/the_greatest_showman.jpg", type: "movie" },
  { title: "Bar Boys", image: "/img/bar_boys.jpg", type: "movie" },
  { title: "A Thousand Splendid Suns", image: "/img/a_thousand_splendid_suns.jpg", type: "book" },
  { title: "The Pelican Brief", image: "/img/the_pelican_brief.jpg", type: "book" },
  { title: "The Alchemist", image: "/img/Alchemist.jpg", type: "book" },
  { title: "Life of Pi", image: "/img/life_of_pi.jpg", type: "book" },
  { title: "The Five People You Meet in Heaven", image: "/img/the_five_people_you_meet_in_heaven.jpg", type: "book" },
  { title: "The Book Thief", image: "/img/the_book_thief.jpg", type: "book" },
  { title: "Si", image: "/img/si.jpg", type: "book" },
  { title: "Anxious People", image: "/img/anxious_people.jpg", type: "book" }
];

export const goals: GoalItem[] = [
  {
    id: "01",
    title: "Skills",
    description: "Strengthen my technical and analytical skills beyond the classroom."
  },
  {
    id: "02",
    title: "Balance",
    description: "Maintain balance and continue to grow academically while enjoying life."
  },
  {
    id: "03",
    title: "Impact",
    description: "Become successful while creating positive impact for others.",
    dark: true
  },
  {
    id: "04",
    title: "Purpose",
    description: "Live a purpose-driven life focused on service, growth, and contribution."
  }
];

export const awards: AwardItem[] = [
  {
    id: "A1",
    title: "SM Scholar",
    description: "Selected as an SM Scholar for my college studies."
  },
  {
    id: "A2",
    title: "Highest Honors",
    description: "Graduated senior high school with highest honors."
  },
  {
    id: "A3",
    title: "Honor Student",
    description: "Consistent honor student from junior high through college.",
    dark: true
  },
  {
    id: "A4",
    title: "Leadership",
    description: "Serving as Director of Operations in JPCS while maintaining strong academics."
  }
];

export const galleryItems: GalleryItem[] = [
  { image: "/img/minnie.jpg", alt: "Portrait", orientation: "vertical" },
  { image: "/img/JPCS_general_assembly.JPG", alt: "General assembly", orientation: "horizontal" },
  { image: "/img/sea.jpg", alt: "Sea", orientation: "vertical" },
  { image: "/img/layag.jpg", alt: "Layag", orientation: "horizontal" },
  { image: "/img/paragliding.jpg", alt: "Paragliding", orientation: "vertical" },
  { image: "/img/rai.jpg", alt: "Rai", orientation: "horizontal" }
];

export const attributions: AttributionItem[] = [
  {
    label: "Typography",
    text: "Shantell Sans by Shantell Martin and Arrow Type.",
    linkLabel: "Shantell Sans",
    linkUrl: "https://shantellsans.com/",
    extra: {
      label: "SIL Open Font License",
      url: "https://scripts.sil.org/OFL"
    }
  },
  {
    label: "Design Assets",
    text: "Icons and vectors used from open sources.",
    linkLabel: "Lucide Icons",
    linkUrl: "https://lucide.dev/",
    extra: {
      label: "Flaticon and Vecteezy",
      url: "https://www.flaticon.com/"
    }
  },
  {
    label: "Code",
    text: "Inspiration from community slider patterns and hosted with GitHub Pages.",
    linkLabel: "Hank-D-Tank slider reference",
    linkUrl: "https://github.com/Hank-D-Tank/scroll-trigger-circular-slider/",
    extra: {
      label: "GitHub Pages",
      url: "https://pages.github.com/"
    }
  }
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/elijahnollen", icon: "/img/github.png" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/elijah-nollen-527563321/",
    icon: "/img/linkedin.png"
  },
  { label: "Email", href: "mailto:emnollen@student.apc.edu.ph", icon: "/img/outlook.png" }
];
