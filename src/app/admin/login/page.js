import { adminConfig } from "../lib/session";

export const dynamic = "force-dynamic";

const MESSAGES = {
  1: "That email or password is not right.",
  locked: "Too many wrong attempts. Wait 15 minutes, then try again.",
  origin: "Please log in from this page.",
  setup: "The admin login has not been set up in Vercel yet.",
};

export default function Login({ searchParams }) {
  const cfg = adminConfig();
  const error = MESSAGES[searchParams && searchParams.error];
  return (
    <main className="login">
      <div className="card">
        <div className="logo" style={{ fontSize: 22, fontWeight: 700 }}>
          Comex <span style={{ color: "#b45309" }}>Admin</span>
        </div>
        <p className="note">Website traffic and search performance</p>
        {!cfg.ready ? (
          <div className="alert">
            <b>Login is not set up yet</b>
            Add these in Vercel, Settings, Environment Variables, then redeploy: {cfg.missing.map((k) => <code key={k} style={{ marginRight: 6 }}>{k}</code>)}
          </div>
        ) : (
          <form method="post" action="/api/admin/login">
            {error && <div className="alert" role="alert">{error}</div>}
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
            <button type="submit">Log in</button>
          </form>
        )}
      </div>
    </main>
  );
}
