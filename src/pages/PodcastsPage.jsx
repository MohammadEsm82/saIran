import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import podcastApi from '../api/podcastApi';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Podcast } from 'lucide-react';

const PodcastsPage = () => {
    const navigate = useNavigate();
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [popularPodcasts, setPopularPodcasts] = useState([]);
    const [latestPodcasts, setLatestPodcasts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPodcasts();
        fetchSidebarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchPodcasts = async () => {
        setLoading(true);
        try {
            const result = await podcastApi.getPodcasts(page, 12);
            if (result.success) {
                if (page === 1) {
                    setPodcasts(result.data.podcasts);
                } else {
                    setPodcasts(prev => [...prev, ...result.data.podcasts]);
                }
                setHasMore(result.data.podcasts.length === 12);
            }
        } catch (error) {
            console.error('Error fetching podcasts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSidebarData = async () => {
        try {
            const [popular, latest] = await Promise.all([
                podcastApi.getPopularPodcasts(5),
                podcastApi.getLatestPodcasts(5)
            ]);
            if (popular.success) setPopularPodcasts(popular.data);
            if (latest.success) setLatestPodcasts(latest.data);
        } catch (error) {
            console.error('Error fetching sidebar data:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setPage(1);
            fetchPodcasts();
            return;
        }

        setLoading(true);
        try {
            const result = await podcastApi.searchPodcasts(searchTerm);
            if (result.success) {
                setPodcasts(result.data.podcasts);
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error searching podcasts:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDuration = (duration) => {
        if (!duration) return '00:00';
        return duration;
    };

    const formatViews = (views) => {
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'k';
        }
        return views.toString();
    };

    const getImageUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `http://localhost:3000${url}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">پادکست‌ها</h1>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="جستجوی پادکست..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="px-4 py-2 border border-gray-300 rounded-lg w-64 text-right"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            جستجو
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content - Podcast List */}
                    <div className="lg:col-span-3">
                        {loading && podcasts.length === 0 ? (
                            <LoadingSpinner />
                        ) : podcasts.length === 0 ? (
                            <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                <div className="text-6xl mb-4"><Podcast /></div>
                                <h3 className="text-xl font-semibold text-gray-700">پادکستی یافت نشد</h3>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {podcasts.map((podcast) => (
                                        <div
                                            key={podcast.id}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                            onClick={() => navigate(`/podcast/${podcast.id}`)}
                                        >
                                            <div className="flex">
                                                <div className="w-32 h-32 bg-gray-200 flex-shrink-0">
                                                    {podcast.image_url ? (
                                                        <img
                                                            src={getImageUrl(podcast.image_url)}
                                                            alt={podcast.title}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/128x128?text=Podcast';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-4xl">
                                                            <Podcast />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 p-4 text-right">
                                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                                                        {podcast.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                                        {podcast.description}
                                                    </p>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <div className="flex gap-2 text-xs text-gray-500">
                                                            <span>⏱️ {formatDuration(podcast.duration)}</span>
                                                            <span>👁️ {formatViews(podcast.views)}</span>
                                                        </div>
                                                        {podcast.tags && (
                                                            <div className="text-xs text-blue-600">
                                                                {podcast.tags.split(',').slice(0, 2).map(tag => (
                                                                    <span key={tag} className="ml-1">#{tag.trim()}</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {hasMore && !searchTerm && (
                                    <div className="text-center mt-8">
                                        <button
                                            onClick={() => setPage(prev => prev + 1)}
                                            className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            بارگذاری بیشتر
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Popular Podcasts */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-4 text-right border-b pb-2">🔥 محبوب‌ترین‌ها</h3>
                            <div className="space-y-3">
                                {popularPodcasts.map((podcast) => (
                                    <div
                                        key={podcast.id}
                                        className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                        onClick={() => navigate(`/podcast/${podcast.id}`)}
                                    >
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            {podcast.image_url ? (
                                                <img
                                                    src={getImageUrl(podcast.image_url)}
                                                    alt={podcast.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><Podcast /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-sm font-medium line-clamp-2">{podcast.title}</p>
                                            <p className="text-xs text-gray-500">{formatViews(podcast.views)} بازدید</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Latest Podcasts */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="font-bold text-lg mb-4 text-right border-b pb-2">🆕 جدیدترین‌ها</h3>
                            <div className="space-y-3">
                                {latestPodcasts.map((podcast) => (
                                    <div
                                        key={podcast.id}
                                        className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                        onClick={() => navigate(`/podcast/${podcast.id}`)}
                                    >
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            {podcast.image_url ? (
                                                <img
                                                    src={getImageUrl(podcast.image_url)}
                                                    alt={podcast.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center"><Podcast /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 text-right">
                                            <p className="text-sm font-medium line-clamp-2">{podcast.title}</p>
                                            <p className="text-xs text-gray-500">{formatDuration(podcast.duration)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastsPage;