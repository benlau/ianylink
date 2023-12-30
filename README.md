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
      <td><a href="joplin://x-callback-url/openNote?id=note_id">joplin://x-callback-url/openNote?id=note_id</a></td>
      <td><a href="https://benlau.github.io/l/u/am9wbGluOi8veC1jYWxsYmFjay11cmwvb3Blbk5vdGU_aWQ9bm90ZV9pZA==">https://benlau.github.io/l/u/am9wbGluOi8veC1jYWxsYmFj<br>ay11cmwvb3Blbk5vdGU_aWQ9bm90ZV9pZA==</a></td>
    </tr>
    <tr>
      <td>Obsidian</td>
      <td><a href="obsidian://open?vault=your_vault&file=YOUR_NOTE">obsidian://open?vault=your_vault&file=YOUR_NOTE</a></td>
      <td><a href="https://benlau.github.io/l/u/b2JzaWRpYW46Ly9vcGVuP3ZhdWx0PXlvdXJfdmF1bHQmZmlsZT1ZT1VSX05PVEU=">https://benlau.github.io/l/u/b2JzaWRpYW46Ly9vcGVuP3ZhdWx<br>0PXlvdXJfdmF1bHQmZmlsZT1ZT1VSX05PVEU=</a></td>
    </tr>
    <tr>
      <td>VSCode</td>
      <td><a href="vscode://file/your-local-file-path">vscode://file/your-local-file-path</a></td>
      <td><a href="https://benlau.github.io/l/u/dnNjb2RlOi8vZmlsZS95b3VyLWxvY2FsLWzpbGUtcGF0aA==">https://benlau.github.io/l/u/dnNjb2RlOi8vZmlsZS95<br>b3vy-LWxvY2FsLWzpbGUtcGF0aA==</a></td>
    </tr>
    <tr>
      <td>Mailto Link</td>
      <td><a href="mailto:test@example.com?subject=Testing out mailto!">mailto:test@example.com?subject=Testing out mailto!</a></td>
      <td><a href="https://benlau.github.io/l/u/bWFpbHRvOnRlc3RAZXhhbXBsZS5jb20_c3ViamVjdD1UZXN0aW5nIG91dCBtYWlsdG8h">https://benlau.github.io/l/u/bWFpbHRvOnRlc3RAZXhhbXBsZS<br>5jb20_c3ViamVjdD1UZXN0aW5nIG91dCBtYWlsdG8h</a></td>
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
NODE_ENV=prod npx parcel build --public-url https://benlau.github.io/l src/index.html 
```