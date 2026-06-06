import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, LogOut, Bell } from "lucide-react";

export function ManagerLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAF8", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, backgroundColor: "#FFFFFF", borderRight: "1px solid #EBEBEA", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ height: 60, borderBottom: "1px solid #EBEBEA", display: "flex", alignItems: "center", paddingLeft: 24, gap: 8 }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 17, color: "#1C1C1C", letterSpacing: "0.06em" }}>AROMA</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 500, color: "#ABABAB", letterSpacing: "0.1em" }}>MANAGER</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {[{ to: "/manager", icon: LayoutDashboard, label: "Заказы" }].map(({ to, icon: Icon, label }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  color: active ? "#1C1C1C" : "#6E6E6E",
                  backgroundColor: active ? "#F0EDE7" : "transparent",
                  borderLeft: active ? "2px solid #B8924A" : "2px solid transparent",
                  transition: "all 120ms ease",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.backgroundColor = "#F5F3EF"; e.currentTarget.style.color = "#1C1C1C"; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#6E6E6E"; } }}
              >
                <Icon style={{ width: 16, height: 16 }} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "12px 12px", borderTop: "1px solid #EBEBEA", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1C1C", margin: 0 }}>Менеджер</p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#ABABAB", margin: "2px 0 0" }}>manager@aroma.kg</p>
          </div>
          <button
            style={{ padding: 6, borderRadius: 6, border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#ABABAB", transition: "color 120ms ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
            onMouseLeave={e => (e.currentTarget.style.color = "#ABABAB")}
          >
            <LogOut style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header style={{ height: 60, backgroundColor: "#FFFFFF", borderBottom: "1px solid #EBEBEA", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15, color: "#1C1C1C", margin: 0 }}>
            Панель менеджера
          </p>
          <button
            style={{ position: "relative", padding: 6, borderRadius: 6, border: "none", backgroundColor: "transparent", cursor: "pointer", color: "#ABABAB" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#1C1C1C")}
            onMouseLeave={e => (e.currentTarget.style.color = "#ABABAB")}
          >
            <Bell style={{ width: 18, height: 18 }} />
            <span style={{ position: "absolute", top: 4, right: 4, width: 7, height: 7, backgroundColor: "#C0392B", borderRadius: "50%", border: "2px solid #FFFFFF" }} />
          </button>
        </header>
        <main style={{ flex: 1, padding: 32 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
