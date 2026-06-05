export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { shorthand, format, dictionary } = req.body;

  if (!shorthand) {
    return res.status(400).json({ error: 'Shorthand is required' });
  }

  const dictContext = dictionary && dictionary.length > 0
    ? `\nSHORTHAND DICTIONARY:\n${dictionary.map(d => `${d.abbr} = ${d.expansion}`).join('\n')}`
    : '';

  const fmt = format || 'SOAP';
  const sectionMap = {
    SOAP: 'Subjective, Objective, Assessment, Plan',
    DAP:  'Data, Assessment, Plan',
    BIRP: 'Behavior, Intervention, Response, Plan',
    GIRP: 'Goal, Intervention, Response, Plan',
  };

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
- Expand ONLY what is clearly implied. NEVER invent clinical details.
- Use professional third-person clinical language.
- Structure strictly in ${fmt} format with sections: ${sectionMap[fmt] || fmt}.
- Each section: 2-5 complete sentences sufficient for insurance submission and legal audit.
- Return ONLY a valid JSON object. No markdown, no preamble.
- Keys = exact section names, values = paragraph text.${dictContext}`,
        messages: [
          {
            role: 'user',
            content: `Expand into complete professional ${fmt} clinical note:\n\n${shorthand}`
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
