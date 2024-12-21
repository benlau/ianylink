# IAnyLink - Convert App Links to Universal Web Links

Many modern apps support app links, allowing users to open specific content directly. However, these links often have a problem: they are not supported by other apps, making it impossible to click and open them quickly. Cross-linking between applications is not as trivial as it may seem.

The IAnyLink project is designed to solve this problem. It can convert app links into regular web links (pretending an universal link)

<table>
  <thead>
    <tr>
      <th></th>
      <th>App Link</th>
      <th>Web Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Joplin</td>
      <td><a href="joplin://x-callback-url/openNote?id=ad768a6768564d2bbb2cb87d88b82b31">joplin://x-callback-url/openNote?id=note_id</a></td>
      <td><a href="http://benlau.github.io/l/j/n/ad768a6768564d2bbb2cb87d88b82b31">http://benlau.github.io/l/j/n/ad768a6768564d2bbb2cb87d88b82b31</td>
    </tr>
    <tr>
      <td>Obsidian</td>
      <td><a href="obsidian://open?vault=your_vault&file=YOUR_NOTE">obsidian://open?vault=your_vault&file=YOUR_NOTE</a></td>
      <td><a href="https://benlau.github.io/l/v/obsidian///open?vault=your_vault&file=YOUR_NOTE">https://benlau.github.io/l/v/obsidian///open?vault=your_vault&file=YOUR_NOTE</a></td>
    </tr>
    <tr>
      <td>VSCode</td>
      <td><a href="vscode://file/your-local-file-path">vscode://file/your-local-file-path</a></td>
      <td><a href="https://benlau.github.io/l/v/vscode///file/your-local-file-path">https://benlau.github.io/l/v/vscode///file/your-local-file-path</a></td>
    </tr>
    <tr>
      <td>Mailto Link</td>
      <td><a href="mailto:test@example.com?subject=Testing out mailto!">mailto:test@example.com?subject=Testing out mailto!</a></td>
      <td><a href="https://benlau.github.io/l/v/mailto/test@example.com?subject=Testing out mailto!">https://benlau.github.io/l/v/mailto/test@example.com?subject=Testing out mailto!</a></td>
    </tr>
  </tbody>
</table>

*The service link: https://benlau.github.io/l*

# Example Usecases

1) Open a VSCode project in local drive from Joplin / Obsidian / Notion

2) Add a mailto anchor to Google Docs to send an email to someone with subject `mailto:test@example.com?subject=Testing out mailto!`

# Development

Build Instruction

```
npm install

# Replace by your host
export HOST=https://benlau.github.io
export URI_PREFIX=/l
export HELP_URL=https://github.com/benlau/ianylink
NODE_ENV=production npx parcel build --public-url https://benlau.github.io/l src/index.html 
```