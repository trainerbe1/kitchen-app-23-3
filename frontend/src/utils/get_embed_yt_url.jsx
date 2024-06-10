export default function getEmbedYTUrl(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)|youtu\.be\/([^&]+)/;
    const match = url.match(regex);

    if (match) {
        const videoId = match[1] || match[2];
        return `https://www.youtube.com/embed/${videoId}`;
    } else {
        return null;
    }
}