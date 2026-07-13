/* AboutPage — the "extended cut" readme, served at /about. The intro prose is
   live from constantVars.aboutParagraphs (shared with the home page's Readme
   section); identity + long-form sections come from src/assets/aboutContent.ts.
   The identity photo randomizes from mePictures on the client; popout opens the
   shared lightbox over the full gallery. Reuses the terminal palette, shared
   top bar, and site footer. */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../terminal-home/TerminalHome.css"; // shared .thome tokens + CRT fx + lightbox
import "./AboutPage.css";
import SubTopbar from "../site-chrome/SubTopbar";
import SiteFooter from "../terminal-home/SiteFooter";
import Lightbox from "../terminal-home/Lightbox";
import ResponsiveImage from "../ResponsiveImage";
import { usePageChrome } from "../../hooks/usePageChrome";
import { useVisitorPrefs } from "../../hooks/useVisitorPrefs";
import { useLightbox } from "../../hooks/useLightbox";
import { aboutParagraphs } from "../../assets/constantVars";
import { mePicturesSorted } from "../../assets/myPictures";
import { personImageAlt } from "../../assets/projects";
import { aboutIdentity, aboutPage, aboutSections } from "../../assets/aboutContent";
import { resolveResponsiveImage } from "../../lib/responsiveImage";

// Full me-pictures gallery for the lightbox (stable order for ←/→)
const ME_GALLERY = mePicturesSorted.map(p => ({
  src: resolveResponsiveImage(p.path, "mosaic").lightboxSrc,
  cap: p.label
}));

/* Renders an identity link — SPA Link for internal paths, <a> for external/PDF */
function IdentityLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  if (external) {
    return (
      <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {label}
      </a>
    );
  }
  return <Link to={href}>{label}</Link>;
}

/* Picks a random me-picture after mount so SSR/hydration stay stable */
function useRandomMePicture() {
  // SSR + first paint: professional headshot (matches Person schema image)
  const [pic, setPic] = useState(() =>
    mePicturesSorted.find(p => p.path === aboutIdentity.headshot) ?? mePicturesSorted[0]
  );

  useEffect(() => {
    if (mePicturesSorted.length === 0) return;
    setPic(mePicturesSorted[Math.floor(Math.random() * mePicturesSorted.length)]);
  }, []);

  return pic;
}

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pic = useRandomMePicture();
  const { lb, openList, handleRootClick, handleRootKeyDown } = useLightbox(rootRef);

  /* Opens the lightbox on all me-pictures, starting at the current headshot */
  function openGallery() {
    const idx = mePicturesSorted.findIndex(item => item.path === pic.path);
    openList(ME_GALLERY, idx >= 0 ? idx : 0);
  }

  usePageChrome("#070906");
  useVisitorPrefs(rootRef); // carry the visitor's chosen accent across pages

  return (
    <div
      ref={rootRef}
      className="thome apage"
      data-scan="on"
      onClick={handleRootClick}
      onKeyDown={handleRootKeyDown}
    >
      {/* background layers (grid + CRT scanlines + vignette) */}
      <div className="ap-grid" />
      <div className="fx-scan" />
      <div className="fx-vig" />

      {/* shared lightbox for the me-pictures popout */}
      <Lightbox lb={lb} />

      <SubTopbar host={aboutPage.host} current="about" />

      {/* header */}
      <header className="ap-head">
        <div className="ap-head-in">
          <span className="ap-cmt"><span className="s"># </span>{aboutPage.headerCommand}</span>
          <span className="ap-cmt" aria-hidden="true"><span className="s">// </span>{aboutPage.title}</span>
          <h1 className="ap-title"><span className="gt">&gt; </span>{aboutPage.pageHeading}</h1>
        </div>
      </header>

      {/* entity strip: randomized photo + popout + name/location/links */}
      <section className="ap-identity" aria-label="Profile">
        <div className="ap-shot-wrap">
          <button
            type="button"
            className="ap-shot-btn"
            onClick={openGallery}
            aria-label={aboutIdentity.popoutAria}
          >
            <ResponsiveImage
              className="ap-shot"
              src={pic.path}
              slot="avatar"
              alt={personImageAlt(pic.label)}
              loading="eager"
            />
          </button>
          <button
            type="button"
            className="ap-shot-pop"
            onClick={openGallery}
            aria-label={aboutIdentity.popoutAria}
          >
            {/* External-link / open-in-new icon — matches the popout reference */}
            <svg className="ap-shot-pop-ico" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path
                d="M6.5 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V9.5M9.5 2H14v4.5M14 2 7.5 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="ap-id-copy">
          <p className="ap-id-name">{aboutIdentity.name}</p>
          <p className="ap-id-meta">
            <span className="ac">{aboutIdentity.role}</span>
            <span> · </span>
            <span>{aboutIdentity.location}</span>
          </p>
          <div className="ap-id-links">
            {aboutIdentity.links.map(link => (
              <IdentityLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>
        </div>
      </section>

      {/* intro prose (live, shared with the home page's Readme) */}
      <section className="ap-intro">
        <p className="ap-prompt">
          <span className="pr">{aboutPage.whoami.host}</span> <span className="cmd">{aboutPage.whoami.command}</span>
        </p>
        {aboutParagraphs.map((p, i) => <p key={i} className="ap-prose">{p}</p>)}
      </section>

      {/* extended sections from aboutContent.ts */}
      <section className="ap-sections">
        {aboutSections.map(sec => (
          <div key={sec.file} className="ap-sec">
            <p className="ap-sec-cmd"><span className="pr">$</span> cat {sec.file}</p>
            <h2 className="ap-sec-title"><span className="gt">&gt; </span>{sec.title}</h2>
            {sec.body && sec.body.length > 0 ? (
              sec.body.map((para, i) => <p key={i} className="ap-prose">{para}</p>)
            ) : (
              // Fallback when a section has no body yet — keeps the page layout stable
              <div className="ap-ph"><span className="ex">! empty</span> — {sec.placeholder}</div>
            )}
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
