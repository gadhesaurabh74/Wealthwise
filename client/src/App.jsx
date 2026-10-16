import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CircleHelp,
  CreditCard,
  Goal,
  Home,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { apiRequest } from "./lib/api.js";
import { Button, Logo } from "./components/ui.jsx";
import Overview from "./components/Overview.jsx";
import Transactions from "./components/Transactions.jsx";
import Budgets from "./components/Budgets.jsx";
import Goals from "./components/Goals.jsx";
import Calendar from "./components/Calendar.jsx";
import Simulator from "./components/Simulator.jsx";
import MoneyLeaks from "./components/MoneyLeaks.jsx";
import Recommendations from "./components/Recommendations.jsx";
import Reports from "./components/Reports.jsx";
import Import from "./components/Import.jsx";
import ScheduledExpenses from "./components/ScheduledExpenses.jsx";
import LegalPage from "./components/LegalPage.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Forecast from "./components/Forecast.jsx";

const navItems = [
  { label: "Overview", icon: Home, path: "/app" },
  { label: "Transactions", icon: CreditCard, path: "/app/transactions" },
  { label: "Calendar", icon: CalendarDays, path: "/app/calendar" },
  { label: "Budgets", icon: BarChart3, path: "/app/budgets" },
  { label: "Goals", icon: Goal, path: "/app/goals" },
  { label: "Forecast", icon: Sparkles, path: "/app/forecast" },
];
function Landing() {
  return (
    <div className="marketing-page">
      <header className="marketing-nav">
        <Logo />
        <nav>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Log in
          </Link>
          <Button to="/signup">
            Get started <ArrowRight size={16} />
          </Button>
        </div>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Clarity for your money</div>
            <h1>
              Your money,
              <br />
              <em>under control.</em>
            </h1>
            <p className="hero-text">
              Understand your spending, anticipate upcoming expenses, and make
              smarter financial decisions with a personal finance workspace
              designed around your real habits.
            </p>
            <div className="hero-actions">
              <Button to="/signup">
                Start for free <ArrowRight size={17} />
              </Button>
              <a className="text-link" href="#features">See how it works <ArrowRight size={15} /></a>
            </div>
            <div className="trust-row"><span>Private by design</span><span>No card required</span></div>
          </div>
          <div className="preview-card">
            <div className="preview-top"><b>spendsense</b><span className="preview-avatar">JD</span></div>
            <div className="preview-label">Safe to spend today</div>
            <div className="preview-amount">
              $84<span>.20</span>
            </div>
            <div className="preview-bar">
              <i />
            </div>
            <div className="preview-meta"><span>Daily allowance <b>$112.40</b></span><span>Next payday <b>in 9 days</b></span></div>
            <div className="preview-chart"><div className="chart-label"><span>Spending pace</span><span className="green-text">On track</span></div><div className="bars">{[35, 52, 42, 68, 48, 75, 55, 65].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
          </div>
        </section>
        <div className="landing-note"><span>Designed for everyday money decisions</span><span>Clear numbers</span><span>Explainable guidance</span><span>Your data, your workspace</span></div>
        <section className="section" id="features">
          <div className="eyebrow">A clearer financial picture</div>
          <h2>
            More than a tracker.
            <br />
            <span>Your financial edge.</span>
          </h2>
          <div className="feature-grid">
            <Feature
              icon={Goal}
              title="Know your safe-to-spend"
              text="See what you can spend today after accounting for commitments and goals."
            />
            <Feature
              icon={BarChart3}
              title="See what comes next"
              text="Understand your month-end trajectory before a surprise catches you off guard."
            />
            <Feature
              icon={Sparkles}
              title="Find the money leaks"
              text="Spot spending patterns adding up."
            />
          </div>
        </section>
        <section className="landing-cta" id="how"><div className="eyebrow">A calmer way forward</div><h2>Make your next money decision<br /><span>with more confidence.</span></h2><p>Bring together what you know, understand the pattern, and take the next right step.</p><Button to="/signup">Create your free workspace <ArrowRight size={16} /></Button></section>
      </main>
      <footer>
        <Logo />
        <span>
          Understand your money. Control your spending. Reach your goals.
        </span>
      </footer>
    </div>
  );
}
function Feature({ icon: Icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">
        <Icon size={21} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
function AuthPage({ mode }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    try {
      await apiRequest(`/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      window.location.href = "/app";
    } catch (requestError) {
      setError(requestError.message);
      setBusy(false);
    }
  };
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <Logo />
        <div className="auth-art">
          <Sparkles size={32} />
        </div>
        <p>
          Make every money decision
          <br />a little more intentional.
        </p>
      </div>
      <form className="auth-form" onSubmit={submit}>
        <div className="mobile-logo">
          <Logo />
        </div>
        <div className="eyebrow">Your financial workspace</div>
        <h1>{mode === "signup" ? "Start with clarity." : "Welcome back."}</h1>
        <p className="form-intro">
          {mode === "signup"
            ? "Create your free SpendSense workspace."
            : "Sign in to continue to your workspace."}
        </p>
        {mode === "signup" && (
          <label>
            Your name
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              minLength="2"
            />
          </label>
        )}
        <label>
          Email address
          <input
            name="email"
            value={form.email}
            onChange={update}
            required
            type="email"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={form.password}
            onChange={update}
            required
            minLength="8"
            type="password"
          />
        </label>
        {mode === "login" && <Link className="forgot-link" to="/forgot-password">Forgot password?</Link>}
        {error && <p className="form-error">{error}</p>}
        <Button disabled={busy}>
          {busy
            ? "Please wait..."
            : mode === "signup"
              ? "Create workspace"
              : "Sign in"}{" "}
          <ArrowRight size={17} />
        </Button>
      </form>
    </div>
  );
}
function Shell({ user }) {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState({ name: user.name, currency: user.currency, timezone: user.timezone });
  const [profileMessage, setProfileMessage] = useState('');
  const logout = async () => {
    try { await apiRequest('/auth/logout', { method: 'POST' }); } finally { window.location.href = '/'; }
  };
  const updateProfile = async (event) => { event.preventDefault(); try { const data = await apiRequest('/auth/profile', { method: 'PATCH', body: JSON.stringify(profile) }); setProfile(data.user); setProfileMessage('Profile updated.'); } catch (error) { setProfileMessage(error.message); } };
  return (
    <div className="app-shell">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="side-top">
          <Logo />
          <button className="close-menu" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="side-label">Workspace</div>
        <nav className="side-nav">
          {navItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                isActive ? "side-link active" : "side-link"
              }
              end={path === "/app"}
              to={path}
              key={path}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="upgrade-card">
            <Sparkles size={18} />
            <b>More clarity awaits</b>
            <p>Advanced insights are coming in Plus.</p>
          </div>
          <NavLink className="side-link" to="/app/settings">
            <CircleHelp size={18} />
            <span>Settings & help</span>
          </NavLink>
          <button className="logout-button" onClick={logout}>Log out</button>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-header">
          <button className="menu-button" onClick={() => setOpen(true)}>
            <Menu size={21} />
          </button>
          <div>
            <span className="header-kicker">Personal workspace</span>
            <h1>Good morning, {user.name}</h1>
          </div>
          <div className="header-actions">
            <button className="icon-button notification-trigger" onClick={() => setNotificationsOpen(!notificationsOpen)} aria-label="Notifications">
              <Bell size={18} />
            </button>
            {notificationsOpen && <div className="notification-popover"><div className="notification-heading"><b>Notifications</b><span>Live workspace</span></div><div className="notification-item"><span className="notification-dot" /><div><b>Keep your picture current</b><p>Add transactions and scheduled expenses to unlock more useful insights.</p></div></div><div className="notification-item"><span className="notification-dot muted" /><div><b>No urgent alerts</b><p>There are no new warnings based on your recorded data.</p></div></div></div>}
            <button className="profile-avatar-button" onClick={() => setProfileOpen(!profileOpen)} aria-label="Open profile menu">{user.name.slice(0, 2).toUpperCase()}</button>
            {profileOpen && <form className="profile-popover" onSubmit={updateProfile}><div className="notification-heading"><b>Your profile</b><span>Account details</span></div><label>Name<input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} required minLength="2" /></label><label>Currency<input value={profile.currency} onChange={(event) => setProfile({ ...profile, currency: event.target.value.toUpperCase() })} maxLength="3" required /></label><label>Timezone<input value={profile.timezone} onChange={(event) => setProfile({ ...profile, timezone: event.target.value })} /></label>{profileMessage && <p className="form-message">{profileMessage}</p>}<button className="button button-primary" type="submit">Update profile</button></form>}
          </div>
        </header>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budgets" element={<Budgets />} />
          <Route path="goals" element={<Goals />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="purchase-simulator" element={<Simulator />} />
          <Route path="money-leaks" element={<MoneyLeaks />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="reports" element={<Reports />} />
          <Route path="import" element={<Import />} />
          <Route path="scheduled-expenses" element={<ScheduledExpenses />} />
          <Route path="forecast" element={<Forecast />} />
          <Route path="*" element={<Overview />} />
        </Routes>
      </div>
    </div>
  );
}
function ProtectedShell() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    apiRequest('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);
  return user ? (
    <Shell user={user} />
  ) : (
    <div className="placeholder-panel">
      <p>Loading your secure workspace...</p>
    </div>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/privacy" element={<LegalPage type="privacy" />} />
      <Route path="/terms" element={<LegalPage type="terms" />} />
      <Route path="/app/*" element={<ProtectedShell />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
