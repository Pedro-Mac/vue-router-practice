export const getPhotos = async () => {
    const res = await fetch(`https://api.pexels.com/v1/search?query=people&fit=crop&h=400&w=300&per_page=4`, {
        headers: {
            "Authorization": import.meta.env.VITE_PEXELS_KEY
        }
    })
    return res.json()
}