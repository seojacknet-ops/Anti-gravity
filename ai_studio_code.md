# Nova Application Analysis & Technical Specification

## 1. Core Architecture Overview
Nova is a client-side React application that functions as a **JSON-driven Website Builder**. Instead of storing HTML strings, the application stores the "state" of a website (colors, text, images, fonts) in a structured JSON object (`TemplateData`).

The UI is divided into three main parts:
1.  **State Container (`App.tsx`):** Holds the master JSON object.
2.  **The Editor (`TemplateEditor.tsx`):** Mutates the JSON object based on user input or AI responses.
3.  **The Renderer (`LivePreview.tsx`):** A "dumb" component that simply renders the UI based on the JSON object it receives.

## 2. Key Features & Implementation Strategies

### A. The Rendering Engine (JSON-to-UI)
**Concept:** The website preview is not an iframe or a static HTML file; it is a React component that accepts data as props.
**Implementation:**
*   **Data Structure:** Defined in `types.ts`. It separates `theme` (visuals) from `content` (text/assets).
*   **Dynamic Styling:** The `LivePreview` component uses inline styles for dynamic values (like user-selected colors or fonts) and Tailwind CSS for structural layout.
    *   *Example:* `<button style={{ backgroundColor: theme.primaryColor, borderRadius: theme.borderRadius }}>`
*   **Fonts:** It dynamically constructs a `fontFamily` string based on the selection.

### B. "Live" Dynamic Thumbnails
**Concept:** Instead of generating and storing screenshots for every template variation, the app renders the *actual* website component in the selection grid but shrinks it.
**Implementation:**
*   It renders the `<LivePreview />` component inside the grid card.
*   It applies a CSS transform: `transform: scale(0.25)` and sets the width/height to `400%`.
*   **Benefit:** If you change the default color of a template in code, the thumbnail updates automatically without needing Photoshop.

### C. AI Structured Content Generation (Gemini 2.5 Flash)
**Concept:** The app doesn't just ask the AI to "write a website." It forces the AI to return a strict JSON object that matches the application's state structure.
**Implementation:**
*   **Service:** `services/geminiService.ts` -> `generateSiteContent`.
*   **JSON Mode:** It uses the `responseSchema` configuration in the Gemini API.
*   **Prompt Engineering:** The system prompt explicitly asks for JSON output matching specific keys (`heroHeadline`, `aboutText`, etc.).
*   **Result:** The returned JSON is parsed and immediately merged into the application state using `onUpdate`.

### D. AI Image & Video Generation (Multimodal)
**Concept:** Generating assets on the fly using different models for different media types.

**1. Images (Imagen 3 / `gemini-3-pro-image-preview`):**
*   Sends a text prompt.
*   Receives a Base64 encoded image string.
*   The App stores this Base64 string directly in the `heroImage` field of the state.

**2. Videos (Veo / `veo-3.1-fast-generate-preview`):**
*   **Asynchronous Polling:** Unlike text/images, video takes time.
*   **Step 1:** The app calls `generateVideos` to start the job.
*   **Step 2:** It enters a `while` loop, checking the operation status every 5 seconds.
*   **Step 3:** Once `operation.done` is true, it gets a URI.
*   **Step 4:** It fetches the video blob (appending the API key) and converts it to a Data URL to display in the `<video>` tag.

### E. SEO Analysis
**Concept:** The AI acts as a consultant, analyzing the current state of the content.
**Implementation:**
*   It sends the current `content` object (Business Name, Headline, About Text) to Gemini.
*   It requests a structured analysis (Keywords, Meta Description, Suggestions).
*   The result is displayed in a dedicated UI card.

## 3. Data Flow Diagram

```mermaid
graph TD
    User[User Interaction] --> Editor[TemplateEditor.tsx]
    Editor -- "Manual Input" --> AppState[App.tsx State]
    Editor -- "Prompt + Keywords" --> Gemini[Gemini Service]
    Gemini -- "JSON / Base64" --> AppState
    AppState -- "TemplateData Props" --> Preview[LivePreview.tsx]
    Preview -- "Visuals" --> User