export const stripHtml = (text: string) =>
    text
        .replace(new RegExp('<[^>]*>', 'g'), '')
        .replace(new RegExp('\n', 'g'), '')
        .replace(new RegExp('"', 'g'), '`')
        .replace(new RegExp('http:', 'g'), 'https:');

export const hrefHtml = (url: string): string => `<a href='${url}' target='_blank' class='fancy'>${url}</a>`;

export const inlineEmoji = (emoji: string): string => `<b class='emoji'>${emoji}</b>`;

export const preTag = (message: string): string => `<pre>${message}</pre>`;
