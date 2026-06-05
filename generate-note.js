export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { shorthand, format, dictionary } = req.body;

  if (!shorthand) {
    return res.status(400).json({ error: 'Shorthand is required' });
  }

  // Build dictionary context
  const dictContext = dictionary && dictionary.length > 0
    ? `\nSHORTHAND DICTIONARY:\n${dictionary.map(d => `${d.abbr} = ${d.expansion}`).join('\n')}`
    : '';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        system: `You are NarraScribe, a clinical documentation assistant for licensed mental health therapists. Expand shorthand therapy session notes into complete, professional clinical documentation.

RULES:
- Expand ONLY what is clearly implied by the shorthand
- Use professional clinical language
- Do not invent clinical details not present in the shorthand
- Format the note in ${format || 'SOAP'} format
- Each section should be thorough but concise
- Use third person (e.g. "Client reported..." not "You reported...")
- Never include patient identifying information beyond what is provided${dictContext}`,
        messages: [
          {
            role: 'user',
            content: `Expand this shorthand into a complete ${format || 'SOAP'} clinical note:\n\n${shorthand}`
          }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Anthropic API error' });
    }

    const data = await response.json();
    const note = data.content?.[0]?.text || '';

    return res.status(200).json({ note });

  } catch (error) {
    console.error('Note generation error:', error);
    return res.status(500).json({ error: 'Failed to generate note. Please try again.' });
  }
}
