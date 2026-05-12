import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconChat, IconGoogleDrive, IconRipplingLogo } from "../icons";
import "./LandingPage.css";

/**
 * Single landing row. `icon` is optional. When the icon communicates state
 * (e.g. 🚧 "work in progress"), pass `iconLabel` so screen readers hear it;
 * decorative icons (brand glyphs) should leave it undefined and stay aria-hidden.
 */
function LandingCard({
  to,
  title,
  description,
  icon,
  iconLabel,
}: {
  to: string;
  title: string;
  description: string;
  icon?: ReactNode;
  iconLabel?: string;
}) {
  return (
    <li>
      <Link to={to} className="landing-card">
        <div className="landing-card-title-wrap">
          {icon ? (
            <span
              className="landing-card-icon"
              role={iconLabel ? "img" : undefined}
              aria-label={iconLabel}
              aria-hidden={iconLabel ? undefined : true}
            >
              {icon}
            </span>
          ) : null}
          <h3 className="landing-card-title">{title}</h3>
        </div>
        <p className="landing-card-desc">{description}</p>
        <span className="landing-card-cta">Open spec</span>
      </Link>
    </li>
  );
}

export function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-header">
        <p className="landing-eyebrow">Rippling | In partnership with Pebble</p>
        <h1 className="landing-title">AI components</h1>
        <p className="landing-lede">Interactive specs for AI surfaces in the product.</p>
      </header>

      <section className="landing-section" aria-labelledby="landing-artifacts-heading">
        <h2 id="landing-artifacts-heading" className="landing-section-title">
          Artifacts + widgets
        </h2>
        <ul className="landing-cards" role="list">
          <LandingCard
            to="/in-chat-artifacts"
            title="In-chat widget"
            description="Structured replies in the thread—cards, tables, confirmations, and rich previews aligned with Block Kit."
            icon={<IconChat />}
          />
          <LandingCard
            to="/rippling-native-artifacts"
            title="Rippling-native artifacts"
            description="UI built with Rippling patterns—profiles, policies, workflows, and actions that match the product shell."
            icon={<IconRipplingLogo />}
          />
          <LandingCard
            to="/external-artifacts"
            title="External artifacts"
            description="Embeds, linked docs, partner surfaces, and previews that bridge out of Rippling from the conversation."
            icon={<IconGoogleDrive />}
          />
        </ul>
      </section>

      <section className="landing-section landing-section-spaced" aria-labelledby="landing-specs-heading">
        <h2 id="landing-specs-heading" className="landing-section-title">
          Components + Interactions
        </h2>
        {/* Stable specs — alphabetical. */}
        <ul className="landing-cards" role="list">
          <LandingCard
            to="/chat"
            title="Chat"
            description="Conversation shell—scrollable thread plus anchored composer for Rippling AI chat surfaces."
          />
          <LandingCard
            to="/composer"
            title="Composer"
            description="Primary chat input—width variants, states, and actions for the side-panel experience."
          />
          <LandingCard
            to="/disambiguation"
            title="Disambiguation"
            description="Clarifying questions in-chat—progress, rich option rows, radio or checkbox, and footer actions."
          />
          <LandingCard
            to="/links"
            title="Links"
            description="Inline text and citations in the thread, rich external previews, and emphasized actions below the chat."
          />
          <LandingCard
            to="/prompts"
            title="Prompts"
            description="Prompt templates, guardrails, and recommended copy—placeholder until content is wired."
          />
        </ul>
        {/* Visual divider separates shipped specs from the in-progress group below. */}
        <hr className="landing-cards-rule" aria-hidden />
        {/* In-progress specs — alphabetical. */}
        <ul className="landing-cards" role="list" aria-label="In progress">
          <LandingCard
            to="/artifact-tray"
            title="Artifact tray"
            description="Persistent tray that surfaces saved artifacts—reports, dashboards, workflows, and pinned outputs—across AI surfaces."
            icon="🚧"
            iconLabel="Work in progress"
          />
          <LandingCard
            to="/editing"
            title="Editing"
            description="Interaction pattern for refining AI output in place—drafts, artifact bodies, and prior turns—reusing the composer's edit surface."
            icon="🚧"
            iconLabel="Work in progress"
          />
          <LandingCard
            to="/strong-type"
            title="Strong type"
            description="Slash-command and mention menu—typing / or @ opens a grouped picker that turns a token into a structured choice."
            icon="🚧"
            iconLabel="Work in progress"
          />
        </ul>
      </section>
    </main>
  );
}
