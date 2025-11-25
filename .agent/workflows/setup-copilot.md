---
description: How to activate GitHub Copilot in Anti-Gravity IDE
---

# GitHub Copilot Setup in Anti-Gravity IDE

## ✅ Current Status
- **GitHub Copilot Extension**: Installed (v1.388.0)
- **GitHub Copilot Chat**: Installed (v0.33.2)
- **Anti-Gravity IDE**: Compatible (VS Code-based)

## 🔐 Step 1: Sign In to GitHub Copilot

### Option A: Using Command Palette
1. Press `Ctrl+Shift+P` (or `F1`)
2. Type: `GitHub Copilot: Sign In`
3. Press Enter
4. Follow the browser authentication flow
5. Return to Anti-Gravity after authorizing

### Option B: Using Status Bar
1. Look at the bottom-right status bar
2. Click the GitHub Copilot icon (if visible)
3. Click "Sign In to GitHub"
4. Follow the authentication flow

### Option C: Using Account Menu
1. Click the account icon (bottom-left corner)
2. Select "Sign in to use GitHub Copilot"
3. Follow the authentication flow

## 🎯 Step 2: Verify Copilot is Active

After signing in, you should see:
- A GitHub Copilot icon in the status bar (bottom-right)
- The icon should show a checkmark or be highlighted
- When you hover over it, it should say "GitHub Copilot is active"

## 🚀 Step 3: Start Using Copilot

### Inline Code Suggestions
1. Open any code file (`.ts`, `.tsx`, `.js`, etc.)
2. Start typing code
3. Copilot will show suggestions in gray text
4. Press `Tab` to accept
5. Press `Esc` to dismiss

### Copilot Chat
1. Press `Ctrl+Shift+I` to open Copilot Chat
2. Or click the chat icon in the sidebar
3. Ask questions about your code
4. Request code generation
5. Get explanations and debugging help

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Accept suggestion | `Tab` |
| Dismiss suggestion | `Esc` |
| Next suggestion | `Alt+]` |
| Previous suggestion | `Alt+[` |
| Open inline chat | `Ctrl+I` |
| Open chat panel | `Ctrl+Shift+I` |
| Trigger suggestion | `Alt+\` |

## 🔧 Troubleshooting

### Copilot Not Showing Suggestions?
1. Check the status bar icon - is it active?
2. Open Command Palette: `GitHub Copilot: Check Status`
3. Ensure you have an active Copilot subscription
4. Try reloading the window: `Ctrl+Shift+P` → "Reload Window"

### Authentication Issues?
1. Sign out: `Ctrl+Shift+P` → "GitHub Copilot: Sign Out"
2. Sign back in using the steps above
3. Check your GitHub account has Copilot access

### Extension Not Working?
1. Disable and re-enable the extension:
   - `Ctrl+Shift+P` → "Extensions: Show Installed Extensions"
   - Find "GitHub Copilot"
   - Click "Disable" then "Enable"
2. Reload the window

## 📝 Features Available

### 1. **Code Completion** (Inline)
- Automatic suggestions as you type
- Multi-line code generation
- Context-aware completions

### 2. **Copilot Chat** (Panel)
- Ask questions about your codebase
- Generate new code
- Explain existing code
- Debug and fix issues
- Refactor code

### 3. **Copilot Edits** (New!)
- Make changes across multiple files
- AI-powered refactoring
- Bulk code updates

## 🎓 Pro Tips

1. **Use Comments**: Write a comment describing what you want, then let Copilot generate the code
   ```typescript
   // Create a function that validates email addresses
   // [Copilot will suggest the implementation]
   ```

2. **Context Matters**: Copilot reads your open files for context. Keep relevant files open.

3. **Chat for Complex Tasks**: Use Copilot Chat for multi-step tasks or when you need explanations.

4. **Use @ Mentions in Chat**:
   - `@workspace` - Ask about your entire codebase
   - `@file` - Reference specific files
   - `@terminal` - Get help with terminal commands

5. **Iterate**: If the first suggestion isn't perfect, use `Alt+]` to see alternatives.

## 🔗 Additional Resources

- [GitHub Copilot Docs](https://docs.github.com/copilot)
- [VS Code Copilot Guide](https://code.visualstudio.com/docs/copilot/overview)
- [Copilot Keyboard Shortcuts](https://docs.github.com/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)

---

**Note**: You need an active GitHub Copilot subscription. If you're part of the `seojacknet-ops` organization, check with your admin to ensure Copilot is enabled for your account.
