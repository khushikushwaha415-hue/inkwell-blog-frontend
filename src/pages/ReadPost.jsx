import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function ReadPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then(r => {
      setPost(r.data);
      if (user && r.data.likedBy) {
        setLiked(r.data.likedBy.includes(user._id));
      }
    });
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const { data } = await API.put(`/posts/${id}/like`);
    setPost(data);
    setLiked(data.likedBy.includes(user._id));
  };

  if (!post) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
        <p style={{ color: '#888' }}>Loading post...</p>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '740px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#667eea', fontSize: '14px', cursor: 'pointer', fontWeight: 500, marginBottom: '2rem' }}>
        ← Back to Home
      </button>

      <div style={{
        height: '8px', borderRadius: '20px',
        background: `linear-gradient(90deg, ${post.coverColor || '#667eea'}, ${post.coverColor || '#764ba2'})`,
        marginBottom: '2rem', boxShadow: `0 4px 15px ${post.coverColor || '#667eea'}40`,
      }} />

      <span style={{
        fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px',
        background: '#ede9fe', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>
        {post.category}
      </span>

      <h1 style={{ fontFamily: 'Lora, serif', fontSize: '2.2rem', fontWeight: 700, color: '#1a1a2e', margin: '1rem 0', lineHeight: 1.25 }}>
        {post.title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '16px',
        }}>
          {post.author?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: '#1a1a2e' }}>{post.author?.name}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{post.views} views
          </div>
        </div>
      </div>

      {(post.tags || []).length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {post.tags.map(t => (
            <span key={t} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '20px', background: '#f3f4f6', color: '#555', border: '1px solid #e5e7eb' }}>
              #{t}
            </span>
          ))}
        </div>
      )}

      <div style={{
        fontSize: '17px', lineHeight: 1.9, color: '#374151',
        whiteSpace: 'pre-wrap', marginBottom: '3rem',
        borderTop: '1px solid #f0f0f0', paddingTop: '2rem',
      }}>
        {post.content}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', borderTop: '1px solid #f0f0f0' }}>
        <button onClick={handleLike} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '14px 32px', borderRadius: '50px',
          cursor: 'pointer',
          background: liked ? 'linear-gradient(135deg, #f5576c, #f093fb)' : '#fff',
          color: liked ? '#fff' : '#555',
          outline: liked ? 'none' : '1.5px solid #e5e7eb',
          border: 'none',
          fontSize: '16px', fontWeight: 600,
          boxShadow: liked ? '0 4px 20px rgba(245,87,108,0.4)' : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'all 0.2s',
        }}>
          {liked ? '❤️' : '🤍'} {post.likes} {liked ? 'Liked' : 'Like'}
        </button>
      </div>
    </div>
  );
}