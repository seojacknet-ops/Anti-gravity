---
description: How to select different AI models and agents in GitHub Copilot
---

# GitHub Copilot: AI Models & Agents Guide

## 🤖 Available AI Models (2025)

GitHub Copilot in Anti-Gravity supports multiple AI models:

### **Top-Tier Models**
- **Claude Sonnet 4.5** - Default, best balance of speed and quality
- **Claude Opus 4** - Most capable, best for complex tasks
- **GPT-5** - Latest OpenAI model, excellent reasoning
- **GPT-5 mini** - Faster, good for simple tasks
- **Gemini 2.5 Pro** - Google's latest, strong multimodal

### **Specialized Models**
- **Claude Sonnet 3.5** - Previous generation, still very capable
- **GPT-4.1** - Stable, reliable
- **Gemini 2.0 Flash** - Ultra-fast responses
- **OpenAI o3-mini** - Optimized for code

### **Auto Mode**
- Automatically selects the best model for your task
- Manages rate limits intelligently
- Recommended for most users

---

## 🎯 How to Switch Models

### **Method 1: Chat Model Picker** ⭐ (Easiest)

1. **Open Copilot Chat**: `Ctrl+Shift+I`
2. **Look at the chat input box** - you'll see the current model name (e.g., "Claude Sonnet 4.5")
3. **Click the model name** - a dropdown appears
4. **Select your preferred model**
5. **Done!** The model is now active for this chat session

### **Method 2: Command Palette**

1. Press `Ctrl+Shift+P`
2. Type: `GitHub Copilot: Select Model`
3. Choose from the list
4. Press Enter

### **Method 3: Settings**

1. Press `Ctrl+,` to open Settings
2. Search for: `github.copilot.chat.model`
3. Select your preferred default model
4. This becomes your default for all new chats

---

## 🚀 Agent Modes & Participants

GitHub Copilot has different **agent modes** for different tasks:

### **Built-in Agents (Use with @ in Chat)**

#### **@workspace** - Codebase Expert
- Knows your entire project
- Can search across all files
- Best for: "How does authentication work in this app?"
- Example: `@workspace explain the billing flow`

#### **@vscode** - IDE Assistant
- Helps with VS Code/Anti-Gravity features
- Keyboard shortcuts, settings, extensions
- Example: `@vscode how do I split the editor?`

#### **@terminal** - Command Line Helper
- Generates shell commands
- Explains terminal errors
- Example: `@terminal how do I find all .tsx files?`

#### **@github** - GitHub Integration
- Access your repos, issues, PRs
- Requires GitHub authentication
- Example: `@github show my open PRs`

### **Slash Commands (Use with / in Chat)**

- `/explain` - Explain selected code
- `/fix` - Fix bugs in selected code
- `/tests` - Generate unit tests
- `/doc` - Generate documentation
- `/optimize` - Optimize performance
- `/new` - Create new files/features
- `/clear` - Clear chat history

---

## 🎨 Copilot Agent Mode (Autonomous Coding)

**Agent Mode** is like having an AI pair programmer that can work independently.

### **How to Enable Agent Mode**

1. Open Copilot Chat: `Ctrl+Shift+I`
2. Click the **"Agent Mode"** toggle (if available)
3. Or use Command Palette: `GitHub Copilot: Enable Agent Mode`

### **What Agent Mode Can Do**

- ✅ Analyze your entire codebase
- ✅ Make multi-file edits
- ✅ Run terminal commands (with your approval)
- ✅ Execute tests and fix failures
- ✅ Iterate on solutions autonomously
- ✅ Transform high-level requirements into working code

### **Example Agent Mode Prompts**

```
"Create a new authentication system with JWT tokens"
"Refactor the billing module to use Stripe webhooks"
"Add TypeScript types to all components in src/components"
"Fix all ESLint errors in the project"
```

---

## 🔧 Advanced: Bring Your Own Model (BYOK)

You can use **your own API keys** from other providers:

### **Supported Providers**
- OpenAI (GPT-4, GPT-5, etc.)
- Anthropic (Claude models)
- Google (Gemini models)
- Hundreds of others via API

### **How to Set Up BYOK**

1. Press `Ctrl+,` to open Settings
2. Search for: `github.copilot.advanced`
3. Look for "Language Model API Keys"
4. Add your API key from your provider
5. Select the model in the chat picker

---

## 💡 Best Practices: Which Model to Use?

### **For Code Completion (Inline)**
- Uses the default model (usually Claude Sonnet 4.5)
- You don't need to change this often
- Optimized for speed

### **For Chat & Complex Tasks**

| Task | Recommended Model |
|------|-------------------|
| **Complex refactoring** | Claude Opus 4 |
| **Quick questions** | GPT-5 mini or Auto |
| **Code explanations** | Claude Sonnet 4.5 |
| **Debugging** | GPT-5 or Claude Opus 4 |
| **Documentation** | Gemini 2.5 Pro |
| **Multi-file changes** | Claude Opus 4 + Agent Mode |
| **General use** | Auto (let Copilot decide) |

---

## 🎯 Quick Reference: Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open Copilot Chat | `Ctrl+Shift+I` |
| Inline Chat | `Ctrl+I` |
| Accept suggestion | `Tab` |
| Next suggestion | `Alt+]` |
| Previous suggestion | `Alt+[` |
| Trigger suggestion | `Alt+\` |
| Open Command Palette | `Ctrl+Shift+P` |

---

## 🔍 How to Check Your Current Model

### **In Chat**
- Look at the model name in the chat input box
- It shows which model is currently active

### **Via Command Palette**
1. Press `Ctrl+Shift+P`
2. Type: `GitHub Copilot: Show Model Info`
3. See current model and available options

---

## 🚨 Troubleshooting

### **Model Picker Not Showing?**
- Update Copilot extension: `Ctrl+Shift+P` → "Update Extensions"
- Reload window: `Ctrl+Shift+P` → "Reload Window"
- Check you're signed in: Look for Copilot icon in status bar

### **Agent Mode Not Available?**
- Requires Copilot Pro or Enterprise subscription
- Update to latest Copilot extension
- May be in preview - check GitHub Copilot settings

### **Rate Limits?**
- Switch to "Auto" mode - it manages limits automatically
- Use GPT-5 mini for simple tasks
- Premium requests are limited per month

---

## 📚 Additional Resources

- [GitHub Copilot Models](https://docs.github.com/copilot/using-github-copilot/asking-github-copilot-questions-in-your-ide#choosing-a-model)
- [Copilot Agent Mode](https://github.blog/changelog/2025-02-06-copilot-agent-mode-in-vs-code/)
- [Chat Participants](https://code.visualstudio.com/docs/copilot/copilot-chat)

---

**Pro Tip**: Start with **"Auto"** mode and let Copilot choose the best model for each task. It's smart enough to pick the right tool for the job! 🚀
