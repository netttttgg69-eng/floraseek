import { ArrowRight, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { plants } from "../data/plants.js";
import BlogCoverImage from "./BlogCoverImage.jsx";

const plantsBySlug = new Map(plants.map((plant) => [plant.slug, plant]));

function InlineContent({ children }) {
  return children.map((child, index) => {
    if (typeof child === "string") {
      return child;
    }

    if (child.type === "link") {
      return (
        <Link key={`${child.to}-${index}`} to={child.to}>
          {child.text}
        </Link>
      );
    }

    if (child.type === "strong") {
      return <strong key={`${child.text}-${index}`}>{child.text}</strong>;
    }

    return child.text || "";
  });
}

function PlantLinks({ block }) {
  const linkedPlants = block.plantSlugs
    .map((slug) => plantsBySlug.get(slug))
    .filter(Boolean);

  if (linkedPlants.length === 0) {
    return null;
  }

  return (
    <aside className="blog-profile-links">
      <h3>{block.title}</h3>
      <div>
        {linkedPlants.map((plant) => (
          <Link key={plant.slug} to={`/plants/${plant.slug}`}>
            <Sprout size={16} aria-hidden="true" />
            {plant.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}

function renderBlock(block, index, post) {
  if (block.type === "heading") {
    return <h2 key={`${block.text}-${index}`}>{block.text}</h2>;
  }

  if (block.type === "paragraph") {
    return (
      <p key={`${block.text || index}-${index}`}>
        {block.children ? <InlineContent>{block.children}</InlineContent> : block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={`list-${index}`}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <figure className="blog-figure" key={`image-${index}`}>
        <BlogCoverImage
          alt={block.alt}
          category={post.category}
          className="blog-figure-cover"
          label={block.label}
          src={block.src}
          title={post.title}
        />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    );
  }

  if (block.type === "callout") {
    return (
      <aside className="blog-callout" key={`${block.title}-${index}`}>
        <h3>{block.title}</h3>
        <p>{block.text}</p>
      </aside>
    );
  }

  if (block.type === "plantLinks") {
    return <PlantLinks block={block} key={`${block.title}-${index}`} />;
  }

  if (block.type === "finderCta") {
    return (
      <aside className="blog-inline-cta" key={`${block.title}-${index}`}>
        <div>
          <h3>{block.title}</h3>
          <p>{block.text}</p>
        </div>
        <Link className="button primary" to={block.to}>
          Open Plant Finder
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </aside>
    );
  }

  return null;
}

export default function BlogArticleContent({ post }) {
  return (
    <div className="blog-article-content">
      {post.content.map((block, index) => renderBlock(block, index, post))}
    </div>
  );
}
