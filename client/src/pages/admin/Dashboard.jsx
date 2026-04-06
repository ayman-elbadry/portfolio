import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import { LayoutDashboard, FolderOpen, Layers, Clock, UserCog, LogOut, Menu, X } from 'lucide-react';

const sidebarItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/projects', icon: FolderOpen, label: 'Projets' },
  { path: '/admin/skills', icon: Layers, label: 'Compétences' },
  { path: '/admin/timeline', icon: Clock, label: 'Parcours' },
  { path: '/admin/profile', icon: UserCog, label: 'Profil' },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ projects: 0, skills: 0, experiences: 0, education: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      API.get('/api/projects'),
      API.get('/api/skills'),
      API.get('/api/timeline?type=experience'),
      API.get('/api/timeline?type=education'),
    ]).then(([p, s, e, ed]) => {
      setStats({ projects: p.data.length, skills: s.data.length, experiences: e.data.length, education: ed.data.length });
    }).catch(console.error);
  }, [location]);

  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (path, exact) => exact ? location.pathname === path : location.pathname.startsWith(path);
  const isDashboardRoot = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-surface border-r border-border z-50 flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link to="/admin" className="font-mono text-lg font-bold text-white">
            <span className="text-purple-l">&lt;</span>AEB<span className="text-purple-l">/&gt;</span>
            <span className="text-xs text-text-muted ml-2">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-text-muted"><X size={20} /></button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path, item.exact);
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[rgba(124,58,237,0.15)] text-purple-l' : 'text-text-muted hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}>
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-rose hover:bg-[rgba(244,63,94,0.1)] transition-all">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-surface/50 backdrop-blur-sm sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-text-muted"><Menu size={20} /></button>
          <div />
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">{user?.name}</span>
            <div className="w-8 h-8 rounded-full bg-gradient flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          {isDashboardRoot ? (
            /* Dashboard overview */
            <>
              <h1 className="text-2xl font-bold text-white mb-8">Tableau de bord</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: 'Projets', value: stats.projects, icon: FolderOpen, color: 'icon-ai' },
                  { label: 'Compétences', value: stats.skills, icon: Layers, color: 'icon-front' },
                  { label: 'Expériences', value: stats.experiences, icon: Clock, color: 'icon-back' },
                  { label: 'Formations', value: stats.education, icon: Clock, color: 'icon-db' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="bg-surface border border-border rounded-2xl p-6 hover:border-border-h transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${color}`}><Icon size={20} /></div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{value}</div>
                    <div className="text-sm text-text-muted">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sidebarItems.filter(i => !i.exact).map(item => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path}
                      className="bg-surface border border-border rounded-2xl p-6 hover:border-purple hover:-translate-y-1 transition-all group">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={20} className="text-purple-l" />
                        <h3 className="font-semibold text-white">Gérer {item.label}</h3>
                      </div>
                      <p className="text-sm text-text-muted">Ajouter, modifier ou supprimer des {item.label.toLowerCase()}</p>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}
