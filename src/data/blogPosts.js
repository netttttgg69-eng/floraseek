export const blogCategories = [
  "Plant Care",
  "Plant Guides",
  "Plant Science",
  "Floraseek Updates",
];

// Add new posts here. Published posts are routed automatically at /blog/:slug.
export const blogPosts = [
  {
    title: "7 Easy Houseplants for Beginners",
    slug: "7-easy-houseplants-for-beginners",
    description:
      "A practical starter guide to seven forgiving houseplants and the simple care habits that help them thrive.",
    category: "Plant Guides",
    date: "2026-09-22",
    coverImage: "/images/blog/beginner-houseplants.webp",
    coverImageAlt:
      "A collection of leafy houseplants in terracotta pots arranged on and around a wooden cabinet",
    featured: true,
    status: "published",
    topics: [
      "beginner houseplants",
      "easy indoor plants",
      "snake plant",
      "pothos",
      "watering",
      "low light plants",
    ],
    relatedPlantSlugs: [
      "snake-plant",
      "zz-plant",
      "pothos",
      "spider-plant",
      "peace-lily",
      "aloe-vera",
      "chinese-evergreen",
    ],
    content: [
      {
        type: "paragraph",
        children: [
          "The best beginner houseplants are forgiving. They cope with normal indoor light, recover from the occasional missed watering, and give clear signs when something needs adjusting. Start with plants like ",
          { type: "link", text: "Snake Plant", to: "/plants/snake-plant" },
          ", ",
          { type: "link", text: "ZZ Plant", to: "/plants/zz-plant" },
          ", and ",
          { type: "link", text: "Pothos", to: "/plants/pothos" },
          " before moving into fussier tropical plants.",
        ],
      },
      {
        type: "image",
        label: "Beginner Houseplants",
        alt: "Placeholder for beginner-friendly houseplants grouped near a bright window",
        caption:
          "A strong first plant is one that matches your room before it asks you to change your routine.",
      },
      {
        type: "heading",
        text: "What makes a houseplant beginner-friendly?",
      },
      {
        type: "paragraph",
        text:
          "A beginner plant should tolerate a range of indoor conditions, need watering only after the soil starts to dry, and avoid dramatic decline after one imperfect week. That usually means sturdy foliage, adaptable light needs, and a root system that is not constantly demanding moisture.",
      },
      {
        type: "list",
        items: [
          "Choose plants that prefer bright indirect light but can manage medium light.",
          "Look for plants that store water in thick leaves, stems, rhizomes, or roots.",
          "Avoid plants that require constant humidity, pure water, or exact temperature ranges for your first few purchases.",
          "Use pots with drainage holes and a free-draining indoor potting mix.",
        ],
      },
      {
        type: "heading",
        text: "Seven easy plants to start with",
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Snake Plant" },
          " is one of the most tolerant indoor plants. It handles low to bright indirect light and stores water in its firm upright leaves, so it is better to underwater than to keep the soil wet.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "ZZ Plant" },
          " is similarly resilient. Its thick rhizomes store moisture, making it a smart choice for offices, apartments, and rooms where watering may be irregular.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Pothos" },
          " grows quickly in hanging pots, on shelves, or up a support. It does best in bright indirect light, but it can adapt to lower light if you accept slower growth and less variegation.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Spider Plant" },
          " is cheerful, fast growing, and easy to propagate from the small plantlets that mature plants produce. Give it bright indirect light and water when the top of the mix begins to dry.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Peace Lily" },
          " tolerates lower light than many flowering houseplants, though it blooms best in bright indirect light. It often droops when thirsty, then recovers after watering.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Aloe Vera" },
          " is a succulent that wants bright light and a dry spell between waterings. It is a good reminder that easy care can also mean leaving the plant alone.",
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "strong", text: "Chinese Evergreen" },
          " is a dependable foliage plant for medium to lower light rooms. Keep it away from cold drafts and let the top of the potting mix dry before watering again.",
        ],
      },
      {
        type: "heading",
        text: "A simple care rhythm",
      },
      {
        type: "paragraph",
        text:
          "Check plants once a week rather than watering on a fixed calendar. Push a finger into the potting mix, feel the weight of the pot, and water only when the plant and soil actually need it. Most beginner problems come from too much water, not too little.",
      },
      {
        type: "callout",
        title: "Pet and child note",
        text:
          "Several common houseplants can irritate pets or children if chewed. Place plants thoughtfully and check plant-specific safety before bringing a new one home.",
      },
      {
        type: "plantLinks",
        title: "Explore the beginner picks",
        plantSlugs: [
          "snake-plant",
          "zz-plant",
          "pothos",
          "spider-plant",
          "peace-lily",
          "aloe-vera",
          "chinese-evergreen",
        ],
      },
      {
        type: "finderCta",
        title: "Find more easy plants",
        text:
          "Use the Plant Finder to filter Floraseek by easy difficulty, houseplants, and the climate or growing style that fits your space.",
        to: "/finder?difficulty=easy&category=Houseplants",
      },
    ],
  },
  {
    title: "How to Choose the Perfect Plant for Your Home",
    slug: "how-to-choose-the-perfect-plant-for-your-home",
    description:
      "A room-by-room way to choose plants by light, space, care style, humidity, and household safety.",
    category: "Plant Care",
    date: "2026-09-15",
    coverImage: "/images/blog/choosing-plants.webp",
    coverImageAlt:
      "Several indoor plants arranged on a table beside a glass water carafe and a white mug",
    status: "published",
    topics: [
      "plant finder",
      "indoor plant placement",
      "light",
      "watering",
      "humidity",
      "plant recommendations",
    ],
    relatedPlantSlugs: [
      "monstera-deliciosa",
      "parlor-palm",
      "heartleaf-philodendron",
      "rubber-plant",
      "peperomia",
      "dracaena",
    ],
    content: [
      {
        type: "paragraph",
        children: [
          "Choosing a plant becomes much easier when you start with the room, not the plant. Floraseek can help you compare options in the ",
          { type: "link", text: "Plant Finder", to: "/finder" },
          ", but the best match still depends on light, space, humidity, and how often you realistically want to water.",
        ],
      },
      {
        type: "image",
        label: "Plant Placement",
        alt: "Placeholder for an indoor room showing a window, shelf, and floor plant position",
        caption:
          "The right plant is usually the one whose needs already match the spot you have available.",
      },
      {
        type: "heading",
        text: "Start with the light",
      },
      {
        type: "paragraph",
        text:
          "Light is the first filter because it controls growth, leaf colour, watering speed, and long-term health. Bright indirect light near a window suits many houseplants. Direct sun is stronger and can scorch tropical foliage, while low light usually means slower growth and fewer flowers.",
      },
      {
        type: "list",
        items: [
          "North-facing or shaded rooms usually need tolerant foliage plants.",
          "Bright rooms with filtered light can support many tropical houseplants.",
          "Sunny windows suit succulents, herbs, and plants that naturally like stronger light.",
          "Dark corners should be styled with objects or rotated plants rather than treated as permanent growing spots.",
        ],
      },
      {
        type: "heading",
        text: "Match the plant to your care style",
      },
      {
        type: "paragraph",
        children: [
          "If you travel often or forget to water, choose resilient plants like ",
          { type: "link", text: "Snake Plant", to: "/plants/snake-plant" },
          ", ",
          { type: "link", text: "ZZ Plant", to: "/plants/zz-plant" },
          ", or ",
          { type: "link", text: "Dracaena", to: "/plants/dracaena" },
          ". If you enjoy checking on plants frequently, you may prefer faster-growing tropical plants such as ",
          { type: "link", text: "Monstera Deliciosa", to: "/plants/monstera-deliciosa" },
          " or ",
          { type: "link", text: "Heartleaf Philodendron", to: "/plants/heartleaf-philodendron" },
          ".",
        ],
      },
      {
        type: "heading",
        text: "Think about scale before you buy",
      },
      {
        type: "paragraph",
        text:
          "Small plants are easy to place but may dry out quickly in tiny pots. Larger plants make a room feel settled but need enough floor space, stable light, and room for leaves to expand. Measure the spot, including height and spread, before choosing a statement plant.",
      },
      {
        type: "paragraph",
        children: [
          "For compact shelves and desks, look at ",
          { type: "link", text: "Peperomia", to: "/plants/peperomia" },
          " or ",
          { type: "link", text: "Pilea", to: "/plants/pilea" },
          ". For a softer floor plant, ",
          { type: "link", text: "Parlor Palm", to: "/plants/parlor-palm" },
          " can add texture without becoming too heavy visually.",
        ],
      },
      {
        type: "heading",
        text: "Check humidity, pets, and household flow",
      },
      {
        type: "paragraph",
        text:
          "Bathrooms and kitchens may suit humidity-loving plants if they also have usable light. Hallways, doors, heaters, and air-conditioning vents can stress plants with drafts or repeated bumps. In homes with pets or young children, choose placement carefully and check toxicity before buying.",
      },
      {
        type: "callout",
        title: "A useful buying rule",
        text:
          "Pick for the room you have now, not the room you hope to create later. A good match looks calmer, grows better, and needs less rescue work.",
      },
      {
        type: "plantLinks",
        title: "Profiles mentioned in this guide",
        plantSlugs: [
          "snake-plant",
          "zz-plant",
          "dracaena",
          "monstera-deliciosa",
          "heartleaf-philodendron",
          "peperomia",
          "parlor-palm",
        ],
      },
      {
        type: "finderCta",
        title: "Use Floraseek to narrow the list",
        text:
          "Open the Plant Finder and combine difficulty, category, and climate filters to build a shortlist before you shop.",
        to: "/finder",
      },
    ],
  },
  {
    title: "The Story Behind Floraseek",
    slug: "the-story-behind-floraseek",
    description:
      "An editable founder-story draft with placeholders for the origins, build process, and future plans for Floraseek.",
    category: "Floraseek Updates",
    date: "2026-09-08",
    coverImage: "/images/blog/floraseek-story.webp",
    coverImageAlt:
      "An open laptop on a round table framed by large green indoor plants",
    status: "published",
    topics: [
      "Floraseek",
      "founder story",
      "project update",
      "roadmap",
      "behind the scenes",
    ],
    relatedPlantSlugs: [],
    content: [
      {
        type: "callout",
        title: "Editable draft",
        text:
          "This article is intentionally written as a draft. Replace the bracketed notes with your own story, details, and future plans before publishing it as a personal update.",
      },
      {
        type: "paragraph",
        text:
          "Floraseek began with a simple idea: [add the original reason you wanted to create Floraseek]. The goal was to make plant discovery feel clearer, calmer, and more useful for people who want help choosing plants that suit their space.",
      },
      {
        type: "image",
        label: "Floraseek Notes",
        alt: "Placeholder for personal Floraseek planning notes or early sketches",
        caption:
          "Replace this placeholder with a personal image, sketch, screenshot, or behind-the-scenes detail.",
      },
      {
        type: "heading",
        text: "Why Floraseek was created",
      },
      {
        type: "paragraph",
        text:
          "[Write about the problem you noticed. For example: choosing plants can feel overwhelming, care information can be scattered, or beginners may not know which plants match their home.]",
      },
      {
        type: "paragraph",
        text:
          "[Add any personal context you want to share, such as a class project, hobby, family influence, garden experience, design goal, or interest in making plant information easier to browse.]",
      },
      {
        type: "heading",
        text: "Building the project",
      },
      {
        type: "paragraph",
        text:
          "[Describe the development process in your own words. Mention the plant catalogue, finder filters, quiz, comparison tools, saved plants, visual design, or any technical decisions that mattered to you.]",
      },
      {
        type: "list",
        items: [
          "[Add one challenge you solved while building Floraseek.]",
          "[Add one feature you enjoyed designing or developing.]",
          "[Add one thing you learned from turning the idea into a working website.]",
        ],
      },
      {
        type: "heading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text:
          "[Add future plans here. You might mention deeper care notes, more plant profiles, seasonal guides, accessibility improvements, or better recommendation tools.]",
      },
      {
        type: "finderCta",
        title: "Explore Floraseek",
        text:
          "Use this closing section to invite readers back into the main plant discovery experience.",
        to: "/finder",
      },
    ],
  },
];

function getDateParts(date) {
  return date.split("-").map((part) => Number(part));
}

function getComparableDate(date) {
  const [year, month, day] = getDateParts(date);
  return Date.UTC(year, month - 1, day);
}

function getTextFromChildren(children = []) {
  return children
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }

      return child.text || "";
    })
    .join(" ");
}

function getTextFromBlock(block) {
  if (block.text) {
    return block.text;
  }

  if (block.children) {
    return getTextFromChildren(block.children);
  }

  if (block.items) {
    return block.items.join(" ");
  }

  return [block.title, block.caption, block.label].filter(Boolean).join(" ");
}

export function formatBlogDate(date) {
  const [year, month, day] = getDateParts(date);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function getPublishedBlogPosts() {
  return [...blogPosts]
    .filter((post) => post.status === "published")
    .sort((a, b) => getComparableDate(b.date) - getComparableDate(a.date));
}

export function getFeaturedBlogPost(posts = getPublishedBlogPosts()) {
  return posts.find((post) => post.featured) || posts[0] || null;
}

export function getBlogPostBySlug(slug) {
  return getPublishedBlogPosts().find((post) => post.slug === slug);
}

export function getBlogSearchText(post) {
  return [
    post.title,
    post.description,
    post.category,
    ...(post.topics || []),
    ...post.content.map(getTextFromBlock),
  ]
    .join(" ")
    .toLowerCase();
}

export function getReadingTimeMinutes(post) {
  const text = [post.title, post.description, ...post.content.map(getTextFromBlock)].join(" ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 220));
}

export function getRelatedBlogPosts(currentPost, limit = 3) {
  const currentTopics = new Set(currentPost.topics || []);

  return getPublishedBlogPosts()
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTopicCount = (post.topics || []).filter((topic) => currentTopics.has(topic)).length;
      const categoryScore = post.category === currentPost.category ? 3 : 0;

      return {
        post,
        score: categoryScore + sharedTopicCount,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return getComparableDate(b.post.date) - getComparableDate(a.post.date);
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
