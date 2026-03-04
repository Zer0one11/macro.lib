export default async function handler(req, res) {
    const { q } = req.query;
    const TOKEN = process.env.GITHUB_TOKEN; // Vercel подтянет его из настроек

    if (!q) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const response = await fetch(`https://api.github.com/search/code?q=${encodeURIComponent(q)}`, {
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

