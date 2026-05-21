import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../service/api";

const SLOTS = ["09:00 AM","11:00 AM","01:00 PM","03:00 PM","05:00 PM","07:00 PM"];

export default function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const provider = location.state?.provider;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.firstName || "", phone:"", address:"", date:"", time:"" });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true);
    try {
      await API.post("/bookings", {
        userName:form.name, userPhone:form.phone, userEmail:user.email, address:form.address,
        providerName:provider.name, providerPhone:provider.contact,
        service:provider.service, date:form.date, time:form.time,
      });
      alert("✅ Booking Confirmed!");
      navigate("/mybookings");
    } catch { alert("Booking failed. Try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"88vh", position:"relative", padding:"3rem 0 5rem" }}>
      {/* BG glow */}
      <div style={{ position:"fixed", top:"-100px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"rgba(6,182,212,.06)", filter:"blur(100px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", bottom:"-80px", left:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(139,92,246,.06)", filter:"blur(90px)", pointerEvents:"none", zIndex:0 }} />

      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <div className="row g-5 justify-content-center">

          {/* Provider Info Panel */}
          {provider && (
            <div className="col-lg-4 d-none d-lg-block">
              <div style={{ position:"sticky", top:"100px" }}>
                <div style={{
                  borderRadius:"22px", overflow:"hidden",
                  border:"1px solid rgba(6,182,212,.2)",
                  boxShadow:"0 20px 60px rgba(0,0,0,.5), 0 0 40px rgba(6,182,212,.1)",
                }}>
                  {/* Card header with gradient */}
                  <div style={{
                    background:"linear-gradient(135deg,rgba(6,182,212,.25),rgba(139,92,246,.2))",
                    padding:"2rem", textAlign:"center", position:"relative",
                  }}>
                    <div style={{
                      width:"80px", height:"80px", borderRadius:"20px",
                      background:"rgba(6,182,212,.15)", border:"1px solid rgba(6,182,212,.3)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"2.2rem", margin:"0 auto 1rem",
                    }}>🔧</div>
                    <div className="provider-service-badge">{provider.service}</div>
                    <h4 style={{ fontWeight:800, marginBottom:".3rem" }}>{provider.name}</h4>
                    <div style={{ color:"#64748b", fontSize:".85rem" }}>📞 {provider.contact}</div>
                  </div>

                  {/* Price */}
                  <div style={{
                    background:"rgba(8,15,32,.8)", padding:"1.5rem",
                    borderTop:"1px solid rgba(255,255,255,.07)",
                  }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:".8rem" }}>
                      <span style={{ color:"#64748b", fontSize:".88rem" }}>Service Price</span>
                      <span className="provider-price">₹{provider.price}</span>
                    </div>
                    {[
                      { icon:"bi-shield-check-fill", color:"#10b981", text:"Verified Professional" },
                      { icon:"bi-star-fill",         color:"#f59e0b", text:"Highly Rated" },
                      { icon:"bi-clock-fill",        color:"#06b6d4", text:"On-Time Guarantee" },
                    ].map(i => (
                      <div key={i.text} style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".5rem" }}>
                        <i className={`bi ${i.icon}`} style={{ color:i.color, fontSize:".85rem" }} />
                        <span style={{ color:"#94a3b8", fontSize:".83rem" }}>{i.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="col-lg-7 col-md-10">
            <div style={{ marginBottom:"1.8rem" }}>
              <div className="hero-badge"><i className="bi bi-calendar-check" />Book Service</div>
              <h2 style={{ fontWeight:900, fontSize:"clamp(1.8rem,3vw,2.2rem)" }}>
                Confirm Your <span className="g-text">Booking</span>
              </h2>
              <p style={{ color:"#64748b", marginTop:".3rem" }}>Fill in your details and we'll connect you right away.</p>
            </div>

            <div className="booking-card card">
              {/* Mobile provider info */}
              {provider && (
                <div style={{
                  background:"rgba(6,182,212,.08)", border:"1px solid rgba(6,182,212,.18)",
                  borderRadius:"14px", padding:"1rem 1.3rem", marginBottom:"1.8rem",
                  display:"flex", alignItems:"center", gap:"1rem",
                }}>
                  <div style={{ fontSize:"2rem", background:"rgba(6,182,212,.12)", border:"1px solid rgba(6,182,212,.25)", borderRadius:"12px", width:"50px", height:"50px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>🔧</div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:"1rem" }}>{provider.name}</div>
                    <div className="provider-service-badge" style={{ margin:".2rem 0" }}>{provider.service}</div>
                    <div style={{ color:"#06b6d4", fontWeight:800 }}>₹{provider.price}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person" /></span>
                      <input type="text" className="form-control" name="name" value={form.name} placeholder="Full name" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Contact Number</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-telephone" /></span>
                      <input type="text" className="form-control" name="phone" placeholder="Phone number" onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop:"1rem" }}>
                  <label className="form-label">Service Address</label>
                  <div className="input-group" style={{ alignItems:"flex-start" }}>
                    <span className="input-group-text" style={{ paddingTop:".68rem" }}><i className="bi bi-geo-alt" /></span>
                    <textarea className="form-control" name="address" placeholder="Your complete address..." onChange={handleChange} rows={3} required />
                  </div>
                </div>

                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <label className="form-label">Preferred Date</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-calendar3" /></span>
                      <input type="date" className="form-control" name="date" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time Slot</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-clock" /></span>
                      <select className="form-control" name="time" onChange={handleChange} required>
                        <option value="">Choose time</option>
                        {SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="btn btn-success w-100 mt-4" disabled={loading}
                  style={{ padding:".85rem", fontSize:"1.05rem", borderRadius:"14px" }}>
                  {loading
                    ? <><span className="spinner-border spinner-border-sm me-2" />Confirming...</>
                    : <><i className="bi bi-check-circle-fill me-2" />Confirm Booking</>}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
