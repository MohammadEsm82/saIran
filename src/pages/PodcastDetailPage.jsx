import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import podcastApi from '../api/podcastApi';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Blocks, Calendar, Clock9, Eye, Podcast } from 'lucide-react';

const PodcastDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        fetchPodcast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchPodcast = async () => {
        setLoading(true);
        try {
            const result = await podcastApi.getPodcastById(id);
            if (result.success) {
                setPodcast(result.data.podcast);
                setRelated(result.data.related || []);
            } else {
                navigate('/podcasts');
            }
        } catch (error) {
            console.error('Error fetching podcast:', error);
            navigate('/podcasts');
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

    const getAudioUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `http://localhost:3000${url}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!podcast) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="mx-auto px-4" style={{maxWidth:"var(--max-width)"}}>
                {/* Back Button */}
                <button
                    onClick={() => navigate('/podcasts')}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                    <span>←</span> بازگشت به پادکست‌ها
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Cover Image */}
                            <div className="h-64 bg-gray-200">
                                {podcast.image_url ? (
                                    <img
                                        src={getImageUrl(podcast.image_url)}
                                        alt={podcast.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-r from-blue-500 to-purple-500">
                                        <Podcast size={80} />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 text-right">
                                <h1 className="text-2xl font-bold mb-4">{podcast.title}</h1>
                                
                                <div className="flex gap-4 mb-4 text-sm text-gray-500">
                                    <span className="flex item-center gap-2"><Clock9 size={17}/> {formatDuration(podcast.duration)}</span>
                                    <span className="flex item-center gap-2"><Eye size={17}/> {formatViews(podcast.views)} بازدید</span>
                                    <span className="flex item-center gap-2"><Calendar size={17} /> {new Date(podcast.created_at).toLocaleDateString('fa-IR')}</span>
                                </div>

                                {podcast.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {podcast.tags.split(',').map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="prose max-w-none mb-6">
                                    <h3 className="font-bold mb-2">توضیحات:</h3>
                                    <p className="text-gray-700 leading-relaxed">{podcast.description}</p>
                                </div>

                                {/* Audio Player */}
                                {podcast.audio_url && (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <audio
                                            ref={audioRef}
                                            src={getAudioUrl(podcast.audio_url)}
                                            controls
                                            controlsList="nodownload"
                                            className='w-full'
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Related Podcasts */}
                    {related.length > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
                                <h3 className="font-bold text-lg mb-4 text-right border-b pb-2 flex item-center gap-2"><Blocks size={30}/> مرتبط با این پادکست</h3>
                                <div className="space-y-3">
                                    {related.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                                            onClick={() => navigate(`/podcast/${item.id}`)}
                                        >
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image_url ? (
                                                    <img
                                                        src={getImageUrl(item.image_url)}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                                        <Podcast size={30} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 text-right">
                                                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                                                <p className="text-xs text-gray-500 mt-1">{formatDuration(item.duration)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PodcastDetailPage;