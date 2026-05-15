import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ArtifactTrayPage } from "./pages/ArtifactTrayPage";
import { ComposerPage } from "./pages/ComposerPage";
import { ExternalArtifactsPage } from "./pages/ExternalArtifactsPage";
import { InChatArtifactsPage } from "./pages/InChatArtifactsPage";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import { DisambiguationPage } from "./pages/DisambiguationPage";
import { EditingPage } from "./pages/EditingPage";
import { LinksPage } from "./pages/LinksPage";
import { PromptsPage } from "./pages/PromptsPage";
import { RipplingNativeArtifactsPage } from "./pages/RipplingNativeArtifactsPage";
import { StrongTypePage } from "./pages/StrongTypePage";
import { TextPage } from "./pages/TextPage";
import { ThinkingStatesPage } from "./pages/ThinkingStatesPage";
import { CombinedPrototypePage } from "./pages/CombinedPrototypePage";
import { ComposerExamplePage } from "./pages/ComposerExamplePage";
import { ChatExamplePage } from "./pages/ChatExamplePage";
import { InChatArtifactsExamplePage } from "./pages/InChatArtifactsExamplePage";
import { ArtifactTrayExamplePage } from "./pages/ArtifactTrayExamplePage";
import { RipplingNativeArtifactsExamplePage } from "./pages/RipplingNativeArtifactsExamplePage";
import { ExternalArtifactsExamplePage } from "./pages/ExternalArtifactsExamplePage";
import { ThinkingStatesExamplePage } from "./pages/ThinkingStatesExamplePage";
import { StrongTypeExamplePage } from "./pages/StrongTypeExamplePage";
import { DisambiguationExamplePage } from "./pages/DisambiguationExamplePage";
import { LinksExamplePage } from "./pages/LinksExamplePage";
import { PromptsExamplePage } from "./pages/PromptsExamplePage";
import { EditingExamplePage } from "./pages/EditingExamplePage";
import { TextExamplePage } from "./pages/TextExamplePage";
import { AiIconPage } from "./pages/AiIconPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/prototype" element={<CombinedPrototypePage />} />
        <Route path="/artifact-tray" element={<ArtifactTrayPage />} />
        <Route path="/artifact-tray/example" element={<ArtifactTrayExamplePage />} />
        <Route path="/composer" element={<ComposerPage />} />
        <Route path="/composer/example" element={<ComposerExamplePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/example" element={<ChatExamplePage />} />
        <Route path="/in-chat-artifacts" element={<InChatArtifactsPage />} />
        <Route path="/in-chat-artifacts/example" element={<InChatArtifactsExamplePage />} />
        <Route path="/rippling-native-artifacts" element={<RipplingNativeArtifactsPage />} />
        <Route path="/rippling-native-artifacts/example" element={<RipplingNativeArtifactsExamplePage />} />
        <Route path="/external-artifacts" element={<ExternalArtifactsPage />} />
        <Route path="/external-artifacts/example" element={<ExternalArtifactsExamplePage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/prompts/example" element={<PromptsExamplePage />} />
        <Route path="/disambiguation" element={<DisambiguationPage />} />
        <Route path="/disambiguation/example" element={<DisambiguationExamplePage />} />
        <Route path="/editing" element={<EditingPage />} />
        <Route path="/editing/example" element={<EditingExamplePage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/links/example" element={<LinksExamplePage />} />
        <Route path="/strong-type" element={<StrongTypePage />} />
        <Route path="/strong-type/example" element={<StrongTypeExamplePage />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/text/example" element={<TextExamplePage />} />
        <Route path="/thinking-states" element={<ThinkingStatesPage />} />
        <Route path="/thinking-states/example" element={<ThinkingStatesExamplePage />} />
        <Route path="/ai-icon" element={<AiIconPage />} />
      </Routes>
    </BrowserRouter>
  );
}
