import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CATEGORIES = ['Technology', 'Life', 'Travel', 'Food', 'Health', 'Finance', 'Design'];
const COLORS = ['#667eea', '#f5576c', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#1a1a2e', '#085041'];

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Technology', tags: '', coverColor: '#667eea' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title || !form.excerpt || !form.content) { setError('All fields are required'); return; }
    setLoading(true);
    try {
      await API.post('/posts', { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Lora, serif', fontSize: '1.8rem', color: '#1a1a2e' }}>✍️ Write New Post</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', border: '1px solid #ddd', borderRadius: '10px', background: '#fff', cursor: 'pointer', fontSize: '14px' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{
            padding: '10px 24px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff',
            boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
          }}>
            {loading ? 'Publishing...' : 'Publish Post →'}
          </button>
        </div>
      </div>

      {error && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', fontSize: '13px', marginBottom: '1rem' }}>⚠️ {error}</div>}

      <div style={{ background: '#fff', borderRadius: '20px', padding: '2rem', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

        <input placeholder="Post title..." value={form.title} onChange={e => set('title', e.target.value)}
          style={{ padding: '14px 16px', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '18px', fontFamily: 'Lora, serif', fontWeight: 600, outline: 'none' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Tags (comma separated)</label>
            <input placeholder="React, Tips, Web..." value={form.tags} onChange={e => set('tags', e.target.value)}
              style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Cover Color</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {COLORS.map(c => (
              <div key={c} onClick={() => set('coverColor', c)} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${c}, ${c}99)`,
                cursor: 'pointer', border: form.coverColor === c ? '3px solid #1a1a2e' : '3px solid transparent',
                boxShadow: form.coverColor === c ? '0 0 0 2px #fff inset' : 'none',
              }} />
            ))}
          </div>
        </div>

        <input placeholder="Short excerpt — one line that hooks the reader..." value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
          style={{ padding: '11px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', outline: 'none' }}
        />

        <div>
          <label style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>Content</label>
          <textarea placeholder="Write your story here..." value={form.content} onChange={e => set('content', e.target.value)} rows={14}
            style={{ width: '100%', padding: '14px', border: '1.5px solid #e5e7eb', borderRadius: '12px', fontSize: '15px', outline: 'none', lineHeight: 1.8, resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>
      </div>
    </div>
  );
}