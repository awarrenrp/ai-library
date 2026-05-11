import { Link } from "react-router-dom";
import "./LandingPage.css";

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
          <li>
            <Link to="/in-chat-artifacts" className="landing-card">
              <h3 className="landing-card-title">In-chat widget</h3>
              <p className="landing-card-desc">
                Structured replies in the thread—cards, tables, confirmations, and rich previews aligned with Block Kit.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
          <li>
            <Link to="/rippling-native-artifacts" className="landing-card">
              <h3 className="landing-card-title">Rippling-native artifacts</h3>
              <p className="landing-card-desc">
                UI built with Rippling patterns—profiles, policies, workflows, and actions that match the product shell.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
          <li>
            <Link to="/external-artifacts" className="landing-card">
              <h3 className="landing-card-title">External artifacts</h3>
              <p className="landing-card-desc">
                Embeds, linked docs, partner surfaces, and previews that bridge out of Rippling from the conversation.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="landing-section landing-section-spaced" aria-labelledby="landing-specs-heading">
        <h2 id="landing-specs-heading" className="landing-section-title">
          Component specs
        </h2>
        <ul className="landing-cards" role="list">
          <li>
            <Link to="/composer" className="landing-card">
              <h3 className="landing-card-title">Composer</h3>
              <p className="landing-card-desc">
                Primary chat input—width variants, states, and actions for the side-panel experience.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="landing-card">
              <h3 className="landing-card-title">Chat</h3>
              <p className="landing-card-desc">
                Conversation shell—scrollable thread plus anchored composer for Rippling AI chat surfaces.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
          <li>
            <Link to="/prompts" className="landing-card">
              <h3 className="landing-card-title">Prompts</h3>
              <p className="landing-card-desc">
                Prompt templates, guardrails, and recommended copy—placeholder until content is wired.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
          <li>
            <Link to="/disambiguation" className="landing-card">
              <h3 className="landing-card-title">Disambiguation</h3>
              <p className="landing-card-desc">
                Clarifying questions in-chat—progress, rich option rows, radio or checkbox, and footer actions.
              </p>
              <span className="landing-card-cta">Open spec</span>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
