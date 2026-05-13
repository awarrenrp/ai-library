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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/artifact-tray" element={<ArtifactTrayPage />} />
        <Route path="/composer" element={<ComposerPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/in-chat-artifacts" element={<InChatArtifactsPage />} />
        <Route path="/rippling-native-artifacts" element={<RipplingNativeArtifactsPage />} />
        <Route path="/external-artifacts" element={<ExternalArtifactsPage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/disambiguation" element={<DisambiguationPage />} />
        <Route path="/editing" element={<EditingPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/strong-type" element={<StrongTypePage />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/thinking-states" element={<ThinkingStatesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
