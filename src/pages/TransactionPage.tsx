import React, { useEffect, useState } from 'react';
import ContentHeader from '../components/ContentHeader';
import { fetchTransactions } from '../services/api';
import { formatDate } from '../utils/dateTIme';

const TransactionPage: React.FC = () => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState<number>(0);
    const [limit] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await fetchTransactions(token, offset, limit);

                    if (response && response.data && response.data.status === 0) {
                        const transactionsData = response.data.data.records;
                        if (Array.isArray(transactionsData)) {
                            setTransactions(prev => [...prev, ...transactionsData]);
                            setHasMore(transactionsData.length === limit);
                        } else {
                            setError('Data yang diterima bukan array');
                        }
                    } else {
                        setError('Terjadi kesalahan saat mengambil transaksi');
                    }
                } catch (error) {
                    setError('Terjadi kesalahan saat mengambil transaksi');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [offset, limit]);


    const handleShowMore = () => {
        if (!loading && hasMore) {
            setOffset(prev => prev + limit);
        }
    };

    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-3 mb-5">
            <ContentHeader />

            <h3 className='mb-4'>Semua Transaksi</h3>

            <div className="mt-4">
                <p>Temukan promo menarik</p>

                {transactions.length === 0 ? (
                    <p>Tidak ada transaksi yang tersedia.</p>
                ) : (
                    <div className="row">
                        {transactions.map((transaction, index) => (
                            <div key={index} className="col-md-12 mb-1">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='d-flex'>
                                            <div className='me-auto'>
                                                <strong className={transaction.transaction_type === 'TOPUP' ? 'text-success' : 'text-danger'}>
                                                    {transaction.transaction_type === 'TOPUP' ? '+' : '-'} Rp. {transaction.total_amount.toLocaleString('id-ID')}
                                                </strong>
                                                <div className='small'>{formatDate(transaction.created_on)}</div>
                                            </div>
                                            <div>{transaction.description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='mt-3 text-center'>
                            {loading ? (
                                <p>Memuat...</p>
                            ) : (
                                hasMore ? (
                                    <div className='text-danger text-center fw-bold' style={{ cursor: 'pointer' }} onClick={handleShowMore}>
                                        Tampilkan lebih banyak
                                    </div>
                                ) : (
                                    <p className='text-center'>Tidak ada lagi transaksi untuk ditampilkan.</p>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionPage;
