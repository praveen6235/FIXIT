import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../service/api";

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await API.post("/users/login", form);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch { alert("Login failed. Check your credentials."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "stretch" }}>

      {/* LEFT PANEL – decorative */}
      <div style={{
        flex: "0 0 45%", display: "none",
        background: "linear-gradient(160deg,#04080f 0%,#0c1a35 50%,#0a1228 100%)",
        position: "relative", overflow: "hidden", alignItems: "center", justifyContent: "center", flexDirection: "column",
      }} className="d-none d-lg-flex">
        {/* Orbs */}
        <div style={{ position:"absolute", top:"-80px", left:"-80px", width:"380px", height:"380px", borderRadius:"50%", background:"rgba(6,182,212,.2)", filter:"blur(90px)" }} />
        <div style={{ position:"absolute", bottom:"-60px", right:"-60px", width:"300px", height:"300px", borderRadius:"50%", background:"rgba(139,92,246,.2)", filter:"blur(80px)" }} />

        <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"3rem" }}>
          <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>⚡</div>
          <h2 style={{ fontWeight:900, fontSize:"2.2rem", background:"linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Welcome Back
          </h2>
          <p style={{ color:"#64748b", marginTop:".75rem", lineHeight:1.7, maxWidth:"320px" }}>
            Sign in to book trusted home services at your doorstep.
          </p>

          {/* Decorative service icons */}
          {[
            { e:"🔧", top:"18%", left:"12%",  bg:"rgba(6,182,212,.12)",  border:"rgba(6,182,212,.25)"  },
            { e:"⚡", top:"28%", right:"10%", bg:"rgba(245,158,11,.12)",  border:"rgba(245,158,11,.25)"  },
            { e:"🪚", bottom:"30%", left:"8%",  bg:"rgba(139,92,246,.12)", border:"rgba(139,92,246,.25)" },
            { e:"🎨", bottom:"22%", right:"8%", bg:"rgba(236,72,153,.12)", border:"rgba(236,72,153,.25)" },
          ].map((i,idx) => (
            <div key={idx} style={{
              position:"absolute", top:i.top, bottom:i.bottom, left:i.left, right:i.right,
              width:"52px", height:"52px", borderRadius:"14px",
              background:i.bg, border:`1px solid ${i.border}`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.5rem", backdropFilter:"blur(8px)",
            }}>{i.e}</div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL – form */}
      <div style={{
        flex: 1, display:"flex", alignItems:"center", justifyContent:"center",
        padding:"2.5rem 1.5rem",
        background:"linear-gradient(180deg,rgba(8,15,32,.6) 0%,rgba(4,7,18,.9) 100%)",
      }}>
        <div style={{ width:"100%", maxWidth:"420px" }}>

          {/* Header */}
          <div style={{ marginBottom:"2rem" }}>
            <div style={{
              width:"60px", height:"60px", borderRadius:"16px",
              background:"rgba(6,182,212,.12)", border:"1px solid rgba(6,182,212,.28)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"1.5rem", marginBottom:"1.2rem",
            }}>
              <i className="bi bi-person-circle" style={{ color:"#06b6d4" }} />
            </div>
            <h2 style={{ fontWeight:900, fontSize:"1.9rem", marginBottom:".3rem" }}>Sign In</h2>
            <p style={{ color:"#64748b", fontSize:".88rem" }}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:"1.1rem" }}>
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-envelope" /></span>
                <input type="email" className="form-control" placeholder="you@example.com" name="email" onChange={handleChange} required />
              </div>
            </div>

            <div style={{ marginBottom:"1.6rem" }}>
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-lock" /></span>
                <input type={showPw?"text":"password"} className="form-control" placeholder="Enter password" name="password" onChange={handleChange} required />
                <span className="input-group-text" onClick={() => setShowPw(!showPw)} style={{ cursor:"pointer" }}>
                  <i className={`bi bi-eye${showPw?"-slash":""}`} />
                </span>
              </div>
            </div>

            <button className="btn btn-primary w-100" disabled={loading}
              style={{ padding:".8rem", fontSize:"1rem", borderRadius:"12px" }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Signing in...</>
                : <><i className="bi bi-box-arrow-in-right me-2" />Sign In</>}
            </button>
          </form>

          <p style={{ textAlign:"center", marginTop:"1.4rem", color:"#64748b", fontSize:".88rem" }}>
            New to FixIt?{" "}
            <Link to="/register" className="auth-link">Create a free account →</Link>
          </p>

          {/* Divider */}
          <div style={{ marginTop:"1.5rem", borderTop:"1px solid rgba(255,255,255,.07)", paddingTop:"1.2rem", textAlign:"center" }}>
            <p style={{ color:"#475569", fontSize:".8rem", marginBottom:".8rem" }}>Looking for other portals?</p>
            <div style={{ display:"flex", gap:".6rem", justifyContent:"center" }}>
              <button className="btn btn-dark btn-sm" onClick={() => navigate("/admin/login")} style={{ borderRadius:"8px", fontSize:".8rem" }}>
                <i className="bi bi-shield-lock me-1" />Admin
              </button>
              <button className="btn btn-dark btn-sm" onClick={() => navigate("/provider/login")} style={{ borderRadius:"8px", fontSize:".8rem" }}>
                <i className="bi bi-wrench me-1" />Provider
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
