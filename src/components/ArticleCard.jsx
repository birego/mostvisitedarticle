import './articlecard.css';
import getPageURL from '../helpers/getPageUrl';
import fetchImageFromArticle from '../api/fetchImageFromArticle';
import fetchArticleEditor from '../api/fetchArticleEditor';
import { useEffect, useState } from 'react';
import Button from './Button';
import getEditCount from '../helpers/edits';
const ArticleCard = ({ article, project, views_ceil, rank, country }) => {
    const [url, setUrl] = useState(null);
    const [editors, setEditors] = useState(null);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const link = await fetchImageFromArticle(project, article);
                setUrl(link);
            } catch (error) {
                setUrl(null);
            }
        };

        const fetchEditors = async () => {
            try {
                const editor = await fetchArticleEditor(project, article);
                setEditors(editor);
            } catch (error) {
                setEditors(null);
            }
        };

        fetchEditors();
        fetchImages();
    }, [article, project]);

    const [edits, setEdits] = useState(null);

    useEffect(() => getEditCount(article, project).then((count) => setEdits(count)), [article, project]);

    return (
        <div className='flex flex-col bg-[#ffff1] hover:shadow-[0px_0px_15px_0px_#718096b8] shadow-[0px_0px_7px_0px_#a9a9a9] duration-500 rounded-md w-full overflow-hidden'>
            <img
                src={url ? url : 'https://cdn-icons-png.flaticon.com/256/4598/4598489.png'}
                alt={article}
                className='article-image bg-gray-200 !object-cover'
            />
            <div className='article-content'>
                <h3 className='article-title'>
                    <a href={getPageURL(article, project)} target='_blank'>
                        {article?.includes('_') && (article = article.replace(/_/g, ' '))}
                    </a>
                </h3>
                <div className='article-description flex flex-col gap-2'>
                    <p>
                        <span>Country:</span> <span>{country ? country : 'N/A'}</span>
                    </p>
                    <p>
                        <span>Project: </span> <span>{project}</span>
                    </p>
                    <p>
                        <span>Rank: </span> <span>{rank}</span>
                    </p>
                    <p>
                        <span>Views : </span> <span>{views_ceil}</span>
                    </p>
                    <p>
                        <span>Editors : </span> <span>{editors ? editors : 'Not found'}</span>
                    </p>
                    {edits != 'not found' && (
                        <p>
                            <span>Edits</span> : <span>{edits}</span>
                        </p>
                    )}
                </div>

                <Button event={() => (window.location.href = getPageURL(article, project))} text="Lire l'article" className='article-link' />
            </div>
        </div>
    );
};

export default ArticleCard;
