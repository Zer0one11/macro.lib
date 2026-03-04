export default async function handler(req, res) {
    const { q } = req.query;
    const TOKEN = process.env.GITHUB_TOKEN; 

    if (!q) {
        return res.status(400).json({ error: 'Запрос пуст' });
    }

    const REPO = 'DRANONG/GDMacrosArchive';
    const PATH = 'files/Filtered/';

    try {
        // Поиск по названию файла в конкретном репозитории и папке
        const searchQuery = `${q} repo:${REPO} path:${PATH}`;
        const url = `https://api.github.com/search/code?q=${encodeURIComponent(searchQuery)}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
}
