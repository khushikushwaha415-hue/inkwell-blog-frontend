import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api/axios';

const CATEGORY_COLORS = {
  Technology: { bg: '#dbeafe', color: '#1d4ed8' },
  Life: { bg: '#ede9fe', color: '#6d28d9' },
  Travel: { bg: '#d1fae5', color: '#065f46' },
  Food: { bg: '#fee2e2', color: '#991b1b' },
  Health: { bg: '#dcfce7', color: '#166534' },
  Finance: { bg: '#fef3c7', color: '#92400e' },
  Design: { bg: '#fce7f3', color: '#9d174d' },
  General: { bg: '#f3f4f6', color: '#374151' },
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPosts = () => {
    setLoading(true);
    API.get('/posts').then(r => { setPosts(r.data); setLoading(false); });
  };

  useEffect(() => {
    fetchPosts();
  }, [location.pathname]);

  const categories = ['All', ...Object.keys(CATEGORY_COLORS)];
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>Loading posts...</p>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: '3rem 1rem 2rem',
        background: 'linear-gradient(135deg, #667eea20, #764ba220)',
        borderRadius: '20px', marginBottom: '2rem',
      }}>
        <h1 style={{ fontFamily: 'Lora, serif', fontSize: '2.8rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>
          Stories Worth Reading
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Discover blogs on technology, travel, food, health and more.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        {[
          { label: 'Articles', value: posts.length, emoji: '📝' },
          { label: 'Total Reads', value: posts.reduce((a, p) => a + (p.views || 0), 0), emoji: '👁' },
          { label: 'Total Likes', value: posts.reduce((a, p) => a + (p.likes || 0), 0), emoji: '❤️' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#fff', borderRadius: '14px', padding: '1rem 2rem',
            textAlign: 'center', border: '1px solid #eee', flex: 1, maxWidth: '180px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '1.5rem' }}>{s.emoji}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1a1a2e' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, border: 'none',
            background: activeCategory === cat ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#fff',
            color: activeCategory === cat ? '#fff' : '#555',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <p>No posts in this category yet.</p>
        </div>
      )}

      {/* Featured Post */}
      {featured && (
        <div onClick={() => navigate(`/post/${featured._id}`)} style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          background: '#fff', borderRadius: '20px', overflow: 'hidden',
          border: '1px solid #eee', marginBottom: '2rem', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{
            background: `linear-gradient(135deg, ${featured.coverColor || '#667eea'}, ${featured.coverColor || '#764ba2'}dd)`,
            minHeight: '260px', display: 'flex', alignItems: 'flex-end', padding: '1.5rem',
          }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)', color: '#fff',
              padding: '4px 12px', borderRadius: '20px', fontSize: '12px',
              backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)',
            }}>
              ⭐ Featured
            </span>
          </div>
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            <CategoryBadge category={featured.category} />
            <h2 style={{ fontFamily: 'Lora, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.3 }}>
              {featured.title}
            </h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#999' }}>
              <Avatar name={featured.author?.name} color={featured.coverColor} />
              <span style={{ fontWeight: 500, color: '#555' }}>{featured.author?.name}</span>
              <span>·</span>
              <span>❤️ {featured.likes || 0}</span>
              <span>·</span>
              <span>👁 {featured.views || 0}</span>
            </div>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {rest.map(post => (
            <div key={post._id} onClick={() => navigate(`/post/${post._id}`)} style={{
              background: '#fff', borderRadius: '16px', overflow: 'hidden',
              border: '1px solid #eee', cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ height: '6px', background: `linear-gradient(90deg, ${post.coverColor || '#667eea'}, ${post.coverColor || '#764ba2'})` }} />
              <div style={{ padding: '1.25rem' }}>
                <CategoryBadge category={post.category} />
                <h3 style={{ fontFamily: 'Lora, serif', fontSize: '1rem', fontWeight: 700, color: '#1a1a2e', margin: '8px 0', lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, marginBottom: '12px' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888' }}>
                    <Avatar name={post.author?.name} color={post.coverColor} size={22} />
                    <span>{post.author?.name}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#aaa', display: 'flex', gap: '8px' }}>
                    <span>❤️ {post.likes || 0}</span>
                    <span>👁 {post.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryBadge({ category }) {
  const c = CATEGORY_COLORS[category] || CATEGORY_COLORS.General;
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: c.bg, color: c.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {category}
    </span>
  );
}

function Avatar({ name, color, size = 26 }) {
  const colors = ['#667eea', '#f5576c', '#4facfe', '#43e97b', '#fa709a', '#fee140'];
  const bg = color || colors[(name?.charCodeAt(0) || 0) % colors.length];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size * 0.45, fontWeight: 700, flexShrink: 0 }}>
      {name?.charAt(0).toUpperCase()}
    </div>
  );
}