import React, { useState, useEffect } from 'react';
import podcastApi from '../../api/podcastApi';
import LoadingSpinner from '../Common/LoadingSpinner';
import PodcastModal from './PodcastModal';
import { Pencil, Podcast, Trash2 } from 'lucide-react';

const PodcastManagement = ({ showAlert }) => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingPodcast, setEditingPodcast] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPodcasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const fetchPodcasts = async () => {
        setLoading(true);
        try {
            const result = await podcastApi.getAllPodcastsAdmin(page, 20);
            if (result.success) {
                if (page === 1) {
                    setPodcasts(result.data.podcasts);
                } else {
                    setPodcasts(prev => [...prev, ...result.data.podcasts]);
                }
                setHasMore(result.data.podcasts.length === 20);
            }
        } catch (error) {
            showAlert('خطا در دریافت پادکست‌ها', 'error');
            console.error(error)
        } finally {
            setLoading(false);
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
            showAlert('خطا در جستجو', 'error');
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (window.confirm(`آیا از حذف پادکست "${title}" مطمئن هستید؟`)) {
            try {
                const result = await podcastApi.deletePodcast(id);
                if (result.success) {
                    showAlert('پادکست با موفقیت حذف شد', 'success');
                    fetchPodcasts();
                } else {
                    showAlert(result.message, 'error');
                }
            } catch (error) {
                showAlert('خطا در حذف پادکست', 'error');
                console.error(error)
            }
        }
    };

    const openEditModal = (podcast) => {
        setEditingPodcast(podcast);
        setModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingPodcast(null);
        setModalOpen(true);
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">مدیریت پادکست‌ها</h2>
                <button
                    onClick={openCreateModal}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
                >
                    <span>➕</span> افزودن پادکست جدید
                </button>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="جستجوی پادکست..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-right"
                />
                <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    جستجو
                </button>
            </div>

            {/* Podcasts Table */}
            {loading && podcasts.length === 0 ? (
                <LoadingSpinner />
            ) : podcasts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                    <div className="text-6xl mb-4"><Podcast /></div>
                    <p className="text-gray-500">پادکستی یافت نشد</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تصویر</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عنوان</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">مدت زمان</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">بازدید</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">تگ‌ها</th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">عملیات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {podcasts.map((podcast) => (
                                    <tr key={podcast.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                                                {podcast.image_url ? (
                                                    <img
                                                        src={getImageUrl(podcast.image_url)}
                                                        alt={podcast.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-lg">
                                                        <Podcast />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium max-w-xs">
                                            <p className="line-clamp-2">{podcast.title}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{formatDuration(podcast.duration)}</td>
                                        <td className="px-4 py-3 text-sm">{formatViews(podcast.views)}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex flex-wrap gap-1">
                                                {podcast.tags?.split(',').slice(0, 2).map(tag => (
                                                    <span key={tag} className="px-1 py-0.5 bg-gray-100 text-xs rounded">
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(podcast)}
                                                    className="flex flex-col items-center text-blue-600 hover:text-blue-800"
                                                >
                                                    <Pencil /> ویرایش
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(podcast.id, podcast.title)}
                                                    className="flex flex-col items-center text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 /> حذف
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {hasMore && !searchTerm && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setPage(prev => prev + 1)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                بارگذاری بیشتر
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* Podcast Modal */}
            <PodcastModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditingPodcast(null);
                }}
                onSuccess={() => {
                    setModalOpen(false);
                    setEditingPodcast(null);
                    setPage(1);
                    fetchPodcasts();
                }}
                podcast={editingPodcast}
                showAlert={showAlert}
            />
        </div>
    );
};

export default PodcastManagement;