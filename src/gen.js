const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
let output = `# SG Tech List

List of notable tech companies in Singapore. Useful when looking for a new job.

**New interactive website: [https://sg-tech-list-next.vercel.app/](https://sg-tech-list-next.vercel.app/)**

> **Note** Banks and non-tech companies are intentionally omitted from the list.

> **Note** 
> 😭 Offer Rescinded (2024/2023)
> 
> 🔴 Layoff (2024/2023)
> 
> 🟠 Layoff (2022)
> 
> 🟢 Actively Hiring\n\n`;

data.categories.forEach(category => {
  output += `## ${category.name}\n\n`;
  
  if (category.companies) {
    category.companies.forEach(company => {
      let line = company.sub?  `  - ${company.name}` : `- ${company.name}`;
      if (company.status) line += ` ${company.status}`;
      if (company.note) line += ` [${company.note}](${company.link})`;
      output += line + '\n';
    });
  }
  
  if (category.subcategories) {
    category.subcategories.forEach(sub => {
      output += `### ${sub.name}\n\n`;
      sub.companies.forEach(company => {
        let line = company.sub?  `  - ${company.name}` : `- ${company.name}`;
        if (company.status) line += ` ${company.status}`;
        if (company.note) line += ` [${company.note}](${company.link})`;
        output += line + '\n';
      });
    });
  }
  output += '\n';
});

output += `---\n\n## Other Resources\n\n`;
for (const [category, items] of Object.entries(data.resources)) {
  output += `**${category}**\n\n`;
  items.forEach(item => {
    output += item.sub? `  - [${item.name}](${item.link})\n` : `- [${item.name}](${item.link})\n`;
  });
  output += '\n';
}

output += `## Credits

Credit for inventing the term "FAANG lite" goes to [MrMarciaOng](https://github.com/MrMarciaOng)

## Contribution

This is a community collaborative project. PRs are welcome!

Edit \`src/data.json\` and run \`node gen.js\` to generate the updated list.

[GitHub repo](https://github.com/paradite/sg-tech-list)
`;

fs.writeFileSync('../README.md', output);
