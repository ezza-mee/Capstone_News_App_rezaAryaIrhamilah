import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import { fetchNewsByKeyword } from '../utils/fetchNews';

const CovidPage = () => {
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetchNewsByKeyword('covid-19');
			setNews(result);
			setLoading(false);
		};
		fetchData();
	}, []);

	const handleSave = (item) => {
		const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
		localStorage.setItem('savedArticles', JSON.stringify([...savedArticles, item]));
		alert('Berita disimpan!');
	};

	const handleViewDetails = (url) => {
		if (url) {
			window.open(url, '_blank');
		} else {
			alert('URL tidak tersedia');
		}
	};

	if (loading) return <div className="text-center mt-10">Loading...</div>;

	return (
		<div className="container mx-auto px-4 py-6">
			<h1 className="text-2xl font-bold text-center mb-6">Covid-19 News</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{news.length > 0 ? news.map((item, index) => <NewsCard key={index} item={item} onSave={handleSave} onViewDetails={handleViewDetails} />) : <div className="text-center mt-4">No news available</div>}
			</div>
		</div>
	);
};

export default CovidPage;