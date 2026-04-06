import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-purple top-[20%] left-[10%]" />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-cyan bottom-[20%] right-[10%]" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="font-mono text-2xl font-bold text-white inline-block mb-4">
            <span className="text-purple-l">&lt;</span>AEB<span className="text-purple-l">/&gt;</span>
          </a>
          <h1 className="text-2xl font-bold text-white mb-2">Espace Administration</h1>
          <p className="text-sm text-text-muted">Connectez-vous pour gérer votre portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl p-8">
          {error && (
            <div className="mb-5 px-4 py-3 text-sm font-medium text-rose bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.25)] rounded-xl">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-semibold text-text mb-2">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@portfolio.com"
                className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple focus:shadow-[0_0_0_3px_rgba(124,58,237,0.35)] transition-all placeholder:text-text-dim" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-text mb-2">Mot de passe</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-xl text-white text-sm outline-none focus:border-purple focus:shadow-[0_0_0_3px_rgba(124,58,237,0.35)] transition-all placeholder:text-text-dim" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient text-white font-semibold rounded-full glow-purple hover:-translate-y-0.5 transition-all disabled:opacity-50">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>Se connecter <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
