import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/posts/mine').then(r => setPosts(r.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: '20px', padding: '2rem', marginBottom: '2rem', color: '#fff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <h2 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', marginBottom: '4px' }}>
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            {posts.length} post{posts.length !== 1 ? 's' : ''} published
          </p>
        </div>
        <button onClick={() => navigate('/create')} style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px',
          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
        }}>
          ✍️ Write New Post
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Posts', value: posts.length, emoji: '📝', color: '#667eea' },
          { label: 'Total Likes', value: posts.reduce((a, p) => a + (p.likes || 0), 0), emoji: '❤️', color: '#f5576c' },
          { label: 'Total Views', value: posts.reduce((a, p) => a + (p.views || 0), 0), emoji: '👁', color: '#4facfe' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem', textAlign: 'center', border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '1.8rem' }}>{s.emoji}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts List */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '1rem' }}>Your Posts</h3>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
          <p style={{ color: '#888', marginBottom: '1rem' }}>No posts yet. Start writing!</p>
          <button onClick={() => navigate('/create')} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>
            Write First Post
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(post => (
            <div key={post._id} style={{
              background: '#fff', borderRadius: '14px', padding: '1.25rem',
              border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '8px', height: '50px', borderRadius: '4px', background: `linear-gradient(180deg, ${post.coverColor || '#667eea'}, ${post.coverColor || '#764ba2'})`, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.category}</span>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a2e', margin: '2px 0' }}>{post.title}</h4>
                  <div style={{ fontSize: '12px', color: '#aaa', display: 'flex', gap: '10px' }}>
                    <span>❤️ {post.likes}</span>
                    <span>👁 {post.views}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => navigate(`/post/${post._id}`)} style={{ padding: '7px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', background: '#fff', cursor: 'pointer' }}>
                  View
                </button>
                <button onClick={() => navigate(`/edit/${post._id}`)} style={{ padding: '7px 14px', border: '1px solid #667eea', borderRadius: '8px', fontSize: '13px', color: '#667eea', background: '#fff', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(post._id)} style={{ padding: '7px 14px', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', color: '#dc2626', background: '#fff', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}